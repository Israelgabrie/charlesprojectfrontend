import React from "react";
import { NavLink } from "react-router-dom";
import "../css/sideBar.css";

// Sidebar component for the main homepage
export default function SideBar({ isOpen, isMobile }) {
  return (
    <>
      {/* Sidebar for Laptop (Left Side) */}
      {!isMobile && (
        <div className="sideBarItem bg-light p-3 vh-100 shadow d-none d-md-block" style={{ width: "250px" }}>
          <SidebarLinks />
        </div>
      )}

      {/* Dropdown Sidebar for Mobile (Slides from Top) */}
      {isMobile && (
        <div
          className={`sideBarItem bg-light p-3 w-100 shadow d-block d-md-none position-absolute transition-top ${isOpen ? "top-0" : "top-100"}`}
          style={{ left: 0, zIndex: 1000, height: "auto", marginTop: 70, borderRadius: 5 }}
        >
          <SidebarLinks />
        </div>
      )}
    </>
  );
}

// Sidebar Links Component (updated with dynamic links)
const SidebarLinks = () => (
  <>
    <NavItem to="home">Home</NavItem>
    <NavItem to="newPost">New Post</NavItem>
    <NavItem to="profile">Profile</NavItem>
    <NavItem to="discover">Discover</NavItem>
    <NavItem to="messages">Messages</NavItem>
    <NavItem to="settings">Settings</NavItem>
  </>
);

// NavItem for individual link
const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-start mb-2 w-100 sidebar-btn btn ${
          isActive
            ? "text-white" // White text
              + " active-link" // Custom class for background
            : "btn-light"
        }`
      }
    >
      {children}
    </NavLink>
  );
  
