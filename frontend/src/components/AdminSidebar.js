import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("adminToken");
    setShowLogoutConfirm(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="admin-sidebar">
      <div className="sidebar-title">Admin Dashboard</div>
      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/elections">Manage Elections</NavLink>
        <NavLink to="/admin/candidates">Manage Candidates</NavLink>
        <NavLink to="/admin/results">View Results</NavLink>
      </nav>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      {showLogoutConfirm && (
        <div className="popup-overlay">
          <div className="popup-message">
            <h3>Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="btn-group">
              <button className="yes-btn" onClick={confirmLogout}>Yes</button>
              <button className="no-btn" onClick={cancelLogout}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;