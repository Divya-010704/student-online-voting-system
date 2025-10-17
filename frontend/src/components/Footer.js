import React from 'react';
import './Footer.css'; // Make sure to include the styles
import logo from '../assets/logo.png'; // Adjust the path if needed

function Footer() {
  return (
    <footer className="footer">
      <hr className="footer-separator" />
      <div className="footer-container">
        <div className="footer-left">
          <p>📧 Contact: dd@example.edu</p>
          <a href="#">🔗 Terms & Privacy</a>
          <p className="copyright">© {new Date().getFullYear()} Student Voting System. All rights reserved.</p>
        </div>

        <div className="footer-right">
          <img src={logo} alt="College Logo" />
          <span>🏛️ Aurora Deemed to be University</span>
        </div>
      </div>

      
    </footer>
  );
}

export default Footer;
