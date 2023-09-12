import React from 'react';
import './Footer.css'; // Import your CSS styles here
import logo from '../../assets/images/logo.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="Company Logo" className="logo" />
            <h2 className="company-name">
              <span style={{ color: '#d3d9e3' }}>Shop</span>{' '}
              <span style={{ color: '#f57f17' }}>101</span>
            </h2>
          </div>
          <div className="footer-links">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Shop 101. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
