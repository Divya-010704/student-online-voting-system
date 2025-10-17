// src/pages/CandidateDashboard.js

import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CandidateDashboard = () => {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidateData = async () => {
      const token = localStorage.getItem("candidateToken");

      if (!token) {
        alert("You are not logged in.");
        navigate("/candidate/login");
        return;
      }

      try {
        const res = await api.get("/candidates/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCandidate(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        alert("Failed to load dashboard. Please log in again.");
        localStorage.removeItem("candidateToken");
        navigate("/candidate/login");
      }
    };

    fetchCandidateData();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Welcome, {candidate.name}</h2>
      <p><strong>Position:</strong> {candidate.position}</p>
      <p><strong>Election ID:</strong> {candidate.electionId}</p>
    </div>
  );
};

export default CandidateDashboard;