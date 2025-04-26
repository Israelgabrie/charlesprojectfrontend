import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/navbar.css";
import { useUser } from "../userContext";
import { backendLocation } from "../backendOperation";

export default function AdminNavbar({ toggleSidebar }) {
  const { user } = useUser();

  return (
    <div
      className="navBarContainer w-100"
      style={{ top: 0, position: "fixed", zIndex: 1, marginBottom: 0 }}
    >
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-light p-3"
        style={{ height: "75px" }}
      >
        <NavLink className="navbar-brand" to="/admin">
          <img
            src="/CampusConnectLogo.png"
            alt="CampusConnect Logo"
            width={200}
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleSidebar}
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li
              className="nav-item color-black"
              style={{ backgroundColor: "gray",
                width:45,
                height:45,
                borderRadius:3,
                backgroundImage:`url(${backendLocation}${user.profileImage})`,
                backgroundPosition:"center",
                backgroundSize:"cover"
               }}
            >
              <NavLink className="nav-link" to="/admin/settings">
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                className="nav-link"
                style={{ color: "black" }}
                to="/admin/settings"
              >
                Welcome Back
              </NavLink>
            </li>
          </ul>

          <div
            style={{
              marginLeft: "auto",
              fontWeight: "bold",
              color: "black",
            }}
          >
            Admin: {user?.fullName || "Unknown"}
          </div>
        </div>
      </nav>
    </div>
  );
}
