import React, { useState, useEffect } from "react";
import "../Sidebar/Sidebar.css";
import { useLocation } from "react-router-dom";

function Sidebar() {
  // const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const currentPage = location.pathname;
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

          {/* <li>
                   <a href="#">
                       <i className="fa fa-cogs fa-2x"></i>
                        <span className="nav-text">
                            Modify products imformation
                        </span>
                    </a>
                </li> */}

          <li>
            <a href="/receipt">
              {currentPage === "/receipt" || currentPage === "../receipt" ? (
                <i className="fa fa-book fa-2x active"></i>
              ) : (
                <i className="fa fa-book fa-2x"></i>
              )}
              <span className="nav-text">Receopt's imformation</span>
            </a>
          </li>

          {/* <li>
            <a href="#">
              <i className="fa fa-book fa-2x"></i>
              <span className="nav-text">Receopt's imformation</span>
            </a>
          </li> */}

          {/* <li>
                    <a href="#">
                        <i className="fa fa-minus fa-2x"></i>
                        <span className="nav-text">
                           Receopt's imformation
                        </span>
                    </a>
                </li> */}

          <li>
            <a href="#">
              <i className="fa fa-info fa-2x"></i>
              <span className="nav-text">Stock information</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-power-off fa-2x"></i>
              <span className="nav-text">Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
