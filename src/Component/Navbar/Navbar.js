import React from 'react';
import '../Navbar/Navbar.css'; 

function Navbar() {
  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="logo">
          {/* <img src={logo} alt="Company Logo" className="logo" /> */}
            <h2 className="company-name">
              <span style={{ color: '#d3d9e3' }}>Shop</span>{' '}
              <span style={{ color: '#f57f17' }}>101</span>
            </h2>
          </div>


          <ul className="navbar-nav">
            {/* <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li> */}
            <li>
              <a href="/contact">Cart</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
