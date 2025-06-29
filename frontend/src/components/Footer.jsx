import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear(); // Yılı otomatik alır

  return (
    <footer className="site-footer">
      <p>&copy; {currentYear} Ready2Read | by <a href="https://github.com/asrinsevim" target="_blank" rel="noopener noreferrer">asrinx</a></p>
    </footer>
  );
}
export default Footer;