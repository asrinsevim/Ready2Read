import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

function Layout() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet /> {/* Bu kısım, sayfa içeriğinin geleceği yerdir */}
      </main>
      <Footer />
    </div>
  );
}
export default Layout;