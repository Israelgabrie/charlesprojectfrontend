import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/navbar.css";
import { useUser } from "../userContext";

export default function AdminNavbar({ toggleSidebar }) {
  const { user } = useUser();

  return (
    <div
      className="navBarContainer w-100"
      style={{ top: 0, position: "fixed", zIndex: 1, marginBottom: 0 }}
    >
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark p-3"
        style={{ height: "75px" }}
      >
        <NavLink className="navbar-brand" to="/admin">
          <img src="/CampusConnectLogo.png" alt="CampusConnect Logo" width={200} />
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
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/users">
                Manage Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/requests">
                Requests
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/settings">
                Settings
              </NavLink>
            </li>
          </ul>

          <div style={{ marginLeft: "auto", color: "#fff", fontWeight: "bold" }}>
            Admin: {user?.fullName || "Unknown"}
          </div>
        </div>
      </nav>
    </div>
  );
}
