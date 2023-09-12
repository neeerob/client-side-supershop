// Layout.js

import React from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Footer from '../../Component/Footer/Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="app">
      <Navbar />
      <Sidebar />
      <div className="main-content">
        <div className="content" style={{'marginLeft': '65px'}}>
          <Outlet/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
