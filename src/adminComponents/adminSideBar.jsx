import React from "react";
import { NavLink } from "react-router-dom";
import "../css/sideBar.css"

// Admin Sidebar component
export default function AdminSidebar({ isOpen, isMobile }) {
  return (
    <>
      {/* Sidebar for Laptop (Left Side) */}
      {!isMobile && (
        <div
          className="sideBarItem bg-light p-3 vh-100 shadow d-none d-md-block"
          style={{ width: "250px" }}
        >
          <AdminSidebarLinks />
        </div>
      )}

      {/* Dropdown Sidebar for Mobile (Slides from Top) */}
      {isMobile && (
        <div
          className={`sideBarItem bg-light p-3 w-100 shadow d-block d-md-none position-absolute transition-top ${
            isOpen ? "top-0" : "top-100"
          }`}
          style={{
            left: 0,
            zIndex: 1000,
            height: "auto",
            marginTop: 70,
            borderRadius: 5,
          }}
        >
          <AdminSidebarLinks />
        </div>
      )}
    </>
  );
}

const AdminSidebarLinks = () => (
    <>
      <NavItem to="/admin/home/dashboard">Dashboard</NavItem>
      <NavItem to="/admin/home/manageUsers">Manage Users</NavItem>
      <NavItem to="/admin/home/manageRequests">Manage Requests</NavItem>
      <NavItem to="/admin/home/settings">Settings</NavItem>
    </>
  );
  

// NavItem for individual link
const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `text-start mb-2 w-100 sidebar-btn btn ${
        isActive ? "text-white active-link" : "btn-light"
      }`
    }
  >
    {children}
  </NavLink>
);
