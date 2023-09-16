import React, { useState, useEffect } from 'react';
import '../Navbar/Navbar.css'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar() {
  const [sales, setSales] = useState([]);
  
  useEffect(() => {
    // Retrieve the existing sales data from local storage
    const storedSales = JSON.parse(localStorage.getItem('sales')) || [];
    setSales(storedSales);
  }, []);

  const countSales = () => {
    return sales.length;
  };

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
        <li>
          <a href="/cart">
            <ShoppingCartIcon />
            <span>{countSales()}</span>
          </a>
        </li>
      </ul>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
