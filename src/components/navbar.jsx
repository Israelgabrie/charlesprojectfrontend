import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // for navbar toggler, dropdowns, etc.
import "../css/navbar.css";
import { useUser } from "../userContext";

export default function Navbar({ toggleSidebar }) {
  const {user,setUser} = useUser();
  return (
    <div
      className="navBarContainer w-100"
      style={{ top: 0, position: "fixed", zIndex: 1, marginBottom: 0 }}
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 " style={{ height: "75px" }}>
        <NavLink className="navbar-brand" to="/">
          <img src="/CampusConnectLogo.png" alt="CampusConnect Logo" width={200} />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleSidebar} // Pass the toggleSidebar prop here
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/" style={{
                fontFamily:"CalibreRegular",
                fontWeight:"bolder",
                fontSize:"18px",
                marginTop:"4px"
              }}> Welcome {user.fullName}</NavLink>
            </li>

            
          </ul>
          <form
            className="form-inline my-2 my-lg-0"
            style={{
              marginLeft: "auto",
              marginRight: "10px",
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button  className="navBarBtn btn  my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}
