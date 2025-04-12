import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar';
import SideBar from './sidebar';
import { Outlet, useLocation, useNavigate } from "react-router-dom";


export default function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

//   if (!loggIn) {
//     return (
//       <div>
//         <ToastContainer />
//         <LoadingScreen />
//       </div>
//     );
//   }

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
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

      <div style={{ display: "flex", flexGrow: 1 }}>
        <div className="d-none d-md-block" style={{ width: "250px" }}>
          <SideBar />
        </div>

        <div
          style={{
            flexGrow: 1,
            overflowY: "hidden",
            height: "calc(100vh - 77px)",
            padding:"10px"
          }}
        >
          <Outlet />
        </div>
      </div>

      <SideBar isOpen={isOpen} isMobile />
    </div>
  );
}
