import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { setToken } from "../utils/auth";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For showing error message
  const [popupMessage, setPopupMessage] = useState(""); // ✅ For popup content
  const [loginSuccess, setLoginSuccess] = useState(false); // ✅ Track login status

  const navigate = useNavigate();

  const handleLocalLogin = (e) => {
    e.preventDefault();

    const validAdminId = "divya@gmail.com";
    const validPassword = "divya@0107";

    if (adminId === validAdminId && password === validPassword) {
      console.log("Local Admin Login:", { adminId, password });
      setPopupMessage("Login successful!");
      setLoginSuccess(true);
    } else {
      setPopupMessage("Invalid email or password");
      setLoginSuccess(false);
    }
  };

  const handlePopupClose = () => {
    setPopupMessage("");
    if (loginSuccess) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>

      <button
        style={{
          width: "100px",
          height: "35px",
          backgroundColor: "#facc15",
          color: "#fff",
          border: "none",
          borderRadius: "18px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          position: "absolute",
          top: "110px",
          left: "20px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
          zIndex: 1000,
          transition: "background 0.3s",
        }}
        onClick={() => navigate("/home")}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = "#eab308")
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = "#facc15")
        }
      >
        Back
      </button>

      {/* ✅ Popup message */}
      {popupMessage && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>{popupMessage}</p>
            <button onClick={handlePopupClose}>OK</button>
          </div>
        </div>
      )}

      {/* Single Login Form */}
      <div>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLocalLogin}>
          <input
            type="text"
            placeholder="Email"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
