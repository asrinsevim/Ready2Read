// frontend/src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

function Header() {
  return (
    <header className="site-header">
      {/* Yeni eklenen konteyner div'i */}
      <div className="header-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Ready2Read Logo" className="logo-image" />
        </Link>
        {/* <nav>Buraya gelecekte menü linkleri gelebilir</nav> */}
      </div>
    </header>
  );
}

export default Header;