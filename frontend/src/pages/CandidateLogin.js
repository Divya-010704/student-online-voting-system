// src/pages/CandidateLogin.js
import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CandidateLogin = () => {
  const navigate = useNavigate();
  const [electionId, setElectionId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors

    try {
      const response = await api.post("/candidates/login", { electionId, password });

      // Store the token in localStorage (optional)
      localStorage.setItem("candidateToken", response.data.token);

      alert("Login successful!");
      navigate("/candidate/dashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid Election ID or Password";
      setError(errorMessage);
    }
  };

  return (
    <div className="candidate-login-container">
      <h2>Candidate Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Election ID"
          value={electionId}
          onChange={(e) => setElectionId(e.target.value)}
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
  );
};

export default CandidateLogin;