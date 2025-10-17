import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [studentId, setStudentId] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [branch, setBranch] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleStudentIdChange = async (e) => {
    const id = e.target.value;
    setStudentId(id);

    if (id.length > 0) {
      try {
        const res = await fetch(`http://localhost:4000/api/student/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFullName(data.fullName);
          setGender(data.gender);
          setDateOfBirth(data.dateOfBirth.split('T')[0]);
          setBranch(data.branch);
          setYearOfStudy(data.yearOfStudy);
        } else {
          clearFields();
        }
      } catch (err) {
        console.error(err);
        clearFields();
      }
    } else {
      clearFields();
    }
  };

  const clearFields = () => {
    setFullName('');
    setGender('');
    setDateOfBirth('');
    setBranch('');
    setYearOfStudy('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dateOfBirth) {
      const today = new Date();
      const dob = new Date(dateOfBirth);
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      if (age < 18) {
        alert("You must be at least 18 years old to register.");
        return;
      }
    }

    const res = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Registration successful!');
      navigate('/userlogin');
    } else {
      alert(data.message || 'Registration failed. Please try again.');
    }
  };

  const goToLogin = () => {
    navigate('/userlogin');
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-left">
          <h1>Welcome!</h1>
          <p>Join the voting revolution. Quick, secure, and digital student elections.</p>
          
        </div>

        <div className="register-right">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Student ID" value={studentId} onChange={handleStudentIdChange} required />
            <input type="text" placeholder="Full Name" value={fullName} readOnly />
            <input type="text" placeholder="Gender" value={gender} readOnly />
            <input type="date" value={dateOfBirth} readOnly />
            <input type="text" placeholder="Branch" value={branch} readOnly />
            <input type="number" placeholder="Year of Study" value={yearOfStudy} readOnly />
            <input type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit" className="register-btn">Register</button>
          </form>
          <p className="login-text">
            Already have an account? <span onClick={goToLogin} className="login-link">Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
