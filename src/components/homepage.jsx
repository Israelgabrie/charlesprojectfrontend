import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar";
import SideBar from "./sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../userContext";
import { getLoggedInUser } from "../backendOperation";
import { toast, ToastContainer } from "react-toastify";

export default function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (user) {
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

  const isOnlyHomePage = location.pathname === "/homePage";

  if (isLoading) {
    return (
      <div>
        <ToastContainer />
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <p>Loading...</p>
        </div>
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
          <Outlet />
        </div>
      </div>

      <SideBar isOpen={isOpen} isMobile />
    </div>
  );
}
