import React from 'react';
import '../Sidebar/Sidebar.css'; 

function Sidebar() {
  return (
    <>
      <div className="area"></div><nav className="main-menu">
            <ul className="something">
                <li>
                    <a href="#">
                        <i className="fa fa-home fa-2x"></i>
                        <span className="nav-text">
                           Home/Dashboard
                        </span>
                    </a>
                  
                </li>
                <li className="has-subnav">
                    <a href="#">
                        <i className="fa fa-globe fa-2x"></i>
                        <span className="nav-text">
                            All products
                        </span>
                    </a>
                    
                </li>
                {/* <li className="has-subnav">
                    <a href="#">
                       <i className="fa fa-comments fa-2x"></i>
                        <span className="nav-text">
                            Group Hub Forums
                        </span>
                    </a>
                    
                </li>
                <li className="has-subnav">
                    <a href="#">
                       <i className="fa fa-camera-retro fa-2x"></i>
                        <span className="nav-text">
                            Survey Photos
                        </span>
                    </a>
                   
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-film fa-2x"></i>
                        <span className="nav-text">
                            Surveying Tutorials
                        </span>
                    </a>
                </li> */}
                <li>
                    <a href="#">
                        <i className="fa fa-book fa-2x"></i>
                        <span className="nav-text">
                           Receopt's imformation
                        </span>
                    </a>
                </li>
                <li>
                   <a href="#">
                       <i className="fa fa-cogs fa-2x"></i>
                        <span className="nav-text">
                            Modify products imformation
                        </span>
                    </a>
                </li>
                {/* <li>
                   <a href="#">
                        <i className="fa fa-map-marker fa-2x"></i>
                        <span className="nav-text">
                            Member Map
                        </span>
                    </a>
                </li> */}
                <li>
                    <a href="#">
                       <i className="fa fa-info fa-2x"></i>
                        <span className="nav-text">
                            Stock information
                        </span>
                    </a>
                </li>
                {/* <hr></hr> */}
                <li>
                   <a href="#">
                         <i className="fa fa-power-off fa-2x"></i>
                        <span className="nav-text">
                            Logout
                        </span>
                    </a>
                </li> 
            </ul>

            {/* <ul className="logout">
                <li>
                   <a href="#">
                         <i className="fa fa-power-off fa-2x"></i>
                        <span className="nav-text">
                            Logout
                        </span>
                    </a>
                </li>  
            </ul> */}
        </nav>
    </>
  );
}

export default Sidebar;
