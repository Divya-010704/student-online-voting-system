import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './UserLogin.css'; // Make sure the path matches where you save the CSS

const UserLogin = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Keep it at the top inside component

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, password })
    });

    const data = await res.json();
    
    if (res.ok) {
      // ✅ Save studentId to localStorage
      localStorage.setItem('studentId', studentId);

      // ✅ Show success message and redirect
      alert(data.message);
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      alert(data.message || 'Login failed');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      {/* Back Button */}
  
          <button
  style={{
    width: '100px',                  // ✅ fixed small width
    height: '35px',                  // ✅ controlled height
    backgroundColor: '#facc15',
    color: '#fff',
    border: 'none',
    borderRadius: '18px',
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    position: 'absolute',
    top: '110px',
    left: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)',
    zIndex: 1000,
    transition: 'background 0.3s',
  }}
  onClick={() => navigate('/home')}
  onMouseOver={(e) => e.target.style.backgroundColor = '#eab308'}
  onMouseOut={(e) => e.target.style.backgroundColor = '#facc15'}
>
  Back
</button>

      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit">Login</button>
        </form>

        {/* New Register Link/Button */}
        <p>
          Don't have an account?{' '}
          <span
            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
            onClick={goToRegister}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;