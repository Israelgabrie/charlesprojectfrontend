import React, { useEffect, useState } from "react";
import { useUser } from "../userContext";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import AdminNavbar from "./adminNavBar";
import AdminSidebar from "./adminSideBar";
import { getLoggedInUser } from "../backendOperation";
import { toast, ToastContainer } from "react-toastify";
import { socket } from "../backendOperation";
import LoadingPage from "../components/loadingComponent";

export default function AdminHomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [manageUserStats, setManageUserStats] = useState({});

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (user) {
          if (user.role !== "admin") {
            navigate("/homePage");
          } else {
            setIsLoading(false);
          }
        } else {
          const response = await getLoggedInUser();
          if (response?.user) {
            setUser(response.user);
            if (response.user.role !== "admin") {
              navigate("/homePage");
            } else {
              setIsLoading(false);
            }
          } else {
            navigate("/login");
          }
        }
      } catch (error) {
        toast.error("An error occurred while verifying user");
        navigate("/login");
      }
    };

    checkUser();
  }, []);




  useEffect(() => {
    if (user?.id) {
      socket.emit("joinAdminRoom");
      socket.emit("getManageUsersStats", user?.id, (data) => {
        if (data.success) {
          console.log(data);
          setManageUserStats({
            activeUsers: data.activeUsers,
            totalStudents: data.totalStudents,
            totalUsers: data.totalUsers,
            usersLastWeek: data.usersLastWeek,
            studentUsers: data.studentUsers,
          });
        } else {
          toast.error(response.message || "Failed To Get Manage Users Stats");
        }
      });
    }
  }, [user?.id]);

  
  useEffect(() => {
    socket.emit("joinAdminRoom");
  
    const handleOnline = (userId) => {
      if (userId) {
        setManageUserStats((prevStats) => ({
          ...prevStats,
          studentUsers: prevStats.studentUsers.map((student) =>
            student._id === userId ? { ...student, active: true } : student
          ),
        }));
      }
    };
  
    const handleOffline = (userId) => {
      if (userId) {
        setManageUserStats((prevStats) => ({
          ...prevStats,
          studentUsers: prevStats.studentUsers.map((student) =>
            student._id === userId ? { ...student, active: false } : student
          ),
        }));
      }
    };
  
    socket.on("newUserOnline", handleOnline);
    socket.on("newUserOffline", handleOffline);
  
    return () => {
      socket.off("newUserOnline", handleOnline);
      socket.off("newUserOffline", handleOffline);
    };
  }, []);
  
  

  const isOnlyDashboard = location.pathname === "/admin/dashboard";

  if (isLoading) {
    return (
      <div>
        <ToastContainer />
        <LoadingPage />
      </div>
    );
  }

  return (
    <div
      className="adminHomePageContainer"
      style={{
        position: "fixed",
        minHeight: "100vh",
        width: "100%",
        left: 0,
        top: 0,
        paddingTop: "77px",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ToastContainer />
      <AdminNavbar toggleSidebar={() => setIsOpen(!isOpen)} />

      <div style={{ display: "flex", flexGrow: 1 }}>
        <div className="d-none d-md-block" style={{ width: "250px" }}>
          <AdminSidebar />
        </div>

        <div
          style={{
            flexGrow: 1,
            overflowY: isOnlyDashboard ? "hidden" : "scroll",
            height: "calc(100vh - 77px)",
            padding: "10px",
          }}
        >
          <Outlet context={{ manageUserStats, setManageUserStats }} />
        </div>
      </div>

      <AdminSidebar isOpen={isOpen} isMobile />
    </div>
  );
}
