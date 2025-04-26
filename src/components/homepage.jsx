import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar";
import SideBar from "./sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../userContext";
import { getLoggedInUser, socket } from "../backendOperation";
import { toast, ToastContainer } from "react-toastify";
import LoadingPage from "./loadingComponent";
import { ActiveUsersContext } from "../activeUsersContext"; // adjust path

export default function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (user) {
          console.log(user);
          if (user.role === "admin") {
            navigate("/admin");
          } else {
            setIsLoading(false);
          }
        } else {
          const response = await getLoggedInUser();
          if (response?.user) {
            setUser(response.user);
            if (response.user.role === "admin") {
              navigate("/admin");
            } else {
              setIsLoading(false);
            }
          } else {
            navigate("/login"); // redirect unauthenticated users
          }
        }
      } catch (error) {
        toast.error("An error occurred while verifying user");
        navigate("/login");
      }
    };

    checkUser();
  }, []);

  // This section ahndles the suer acive status

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user?.id) {
        socket.emit("setInActive", user.id, () => {
          // Cleanup
        });
        // Give it a chance to send before unload
        socket.disconnect(); // optionally force close
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      socket.emit("setActive", user.id, (data) => {
        if (data.success) {
          setActiveUsers(data.activeFriends.map((f) => f.chatId));
        } else {
          toast.error(data.message || "Failed To Set User Active");
        }
      });
    }
  }, [user]);

  useEffect(() => {
    socket.on("userActive", ({ chatId }) => {
      toast.info("A new user became active in chat");
      setActiveUsers((prev) => {
        if (!prev.includes(chatId)) return [...prev, chatId];
        return prev;
      });
    });

    socket.on("userInactive", ({ chatId }) => {
      toast.info("A user became inactive in chat");
      setActiveUsers((prev) => prev.filter((id) => id !== chatId));
    });

    return () => {
      socket.off("userActive");
      socket.off("userInactive");
    };
  }, []);





  const isOnlyHomePage = location.pathname === "/homePage";

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
      className="homePageContainer"
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
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

      <div style={{ display: "flex", flexGrow: 1 }}>
        <div className="d-none d-md-block" style={{ width: "250px" }}>
          <SideBar />
        </div>

        <div
          style={{
            flexGrow: 1,
            overflowY: isOnlyHomePage ? "hidden" : "scroll",
            height: "calc(100vh - 77px)",
            padding: "10px",
          }}
        >
          <ActiveUsersContext.Provider value={{ activeUsers }}>
            <Outlet />
          </ActiveUsersContext.Provider>
        </div>
      </div>

      <SideBar isOpen={isOpen} isMobile />
    </div>
  );
}
