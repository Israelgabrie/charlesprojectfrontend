import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // ⬅️ ADD useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/navbar.css";
import { useUser } from "../userContext";
import { backendLocation } from "../backendOperation";

export default function Navbar({ toggleSidebar }) {
  const { user } = useUser();
  const [searchValue, setSearchValue] = useState(""); // ✅ Fixed `export` bug
  const navigate = useNavigate(); // ✅ Hook to redirect

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/homepage/home?search=${encodeURIComponent(searchValue)}`);
    }
  };

  useEffect(()=>{
    if(!searchValue && window.location.search.includes("search")){
      navigate("/homepage/home")
    }
  },[searchValue])

  return (
    <div className="navBarContainer w-100" style={{ top: 0, position: "fixed", zIndex: 1, marginBottom: 0 }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3" style={{ height: "75px" }}>
        <NavLink className="navbar-brand" to="/">
          <img src="/CampusConnectLogo.png" alt="CampusConnect Logo" width={200} />
        </NavLink>
        <button className="navbar-toggler" type="button" onClick={toggleSidebar} aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="posterImage" style={{backgroundImage: `url(${backendLocation}${user.profileImage})`, width: "40px", height: "40px", borderRadius: 3, backgroundSize: "cover"}}></li>

            <li className="nav-item active">
              <NavLink className="nav-link" to="/homepage/home" style={{ fontFamily: "CalibreRegular", fontWeight: "bolder", fontSize: "18px", marginTop: "4px" }}>
                Welcome {user.fullName}
              </NavLink>
            </li>
          </ul>

          {/* 🔍 Search Box */}
          <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit} style={{ marginLeft: "auto", marginRight: "10px", display: "flex", flexDirection: "row", gap: 10 }}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="navBarBtn btn my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  );
}
