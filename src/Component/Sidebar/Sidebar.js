import React, { useState, useEffect } from "react";
import "../Sidebar/Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setTimeout(() => {
      navigate("/auth");
    }, 0);
  };
  return (
    <>
      <div className="area"></div>
      <nav className="main-menu">
        <ul className="something">
          <li>
            <a href="../">
              {currentPage === "/" ? (
                <i className="fa fa-home fa-2x active"></i>
              ) : (
                <i className="fa fa-home fa-2x"></i>
              )}
              <span className="nav-text">All products</span>
            </a>
          </li>

          <li>
            <a href="/addproduct">
              {currentPage === "/addproduct" ? (
                <i className="fa fa-plus fa-2x active"></i>
              ) : (
                <i className="fa fa-plus fa-2x"></i>
              )}
              <span className="nav-text">Add products</span>
            </a>
          </li>

          <li>
            <a href="/modify">
              {currentPage === "/modify" ||
              currentPage === "../productdetails" ? (
                <i className="fa fa-cogs fa-2x active"></i>
              ) : (
                <i className="fa fa-cogs fa-2x"></i>
              )}
              <span className="nav-text">Modify products imformation</span>
            </a>
          </li>

          <li>
            <a href="/receipt">
              {currentPage === "/receipt" || currentPage === "../receipt" ? (
                <i className="fa fa-book fa-2x active"></i>
              ) : (
                <i className="fa fa-book fa-2x"></i>
              )}
              <span className="nav-text">Receipt's imformation</span>
            </a>
          </li>

          <li>
            <a href="/salesinfo">
              {currentPage === "/salesinfo" ||
              currentPage === "../salesinfo" ? (
                <i className="fa fa-money fa-2x active"></i>
              ) : (
                <i className="fa fa-money fa-2x"></i>
              )}
              <span className="nav-text">Sale account information</span>
            </a>
          </li>

          <li>
            <a href="/return">
              {currentPage === "/return" ? (
                <i className="fa fa-repeat fa-2x active"></i>
              ) : (
                <i className="fa fa-repeat fa-2x"></i>
              )}
              <span className="nav-text">Return Receip</span>
            </a>
          </li>

          <li>
            <a href="/report">
              {currentPage === "/report" ? (
                <i className="fa fa-file-text-o fa-2x active"></i>
              ) : (
                <i className="fa fa-file-text-o fa-2x"></i>
              )}
              <span className="nav-text">Sales Report</span>
            </a>
          </li>

          <li onClick={handleLogout}>
            <a href="/report">
              {currentPage === "/report" ? (
                <i className="fa fa-power-off fa-2x "></i>
              ) : (
                <i className="fa fa-power-off fa-2x"></i>
              )}
              <span className="nav-text">Logout</span>
            </a>
          </li>

          {/* <li onClick={handleLogout}>
            <i className="fa fa-power-off fa-2x"></i>
            <span className="nav-text">Logout</span>
          </li> */}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
