import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from "../assets/logo.png";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="left-section">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Student Online Voting Portal</h1>
      </div>

      <div className="right-section">
        <Link to="/home" className="btn">Home</Link>

       

        <Link to="/about" className="btn">About Election</Link>
      </div>
    </header>
  );
};

export default Header;
