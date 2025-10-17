import React, { useEffect, useState } from "react";
import api from "../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    votedCount: 0,
    notVotedCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/voting-stats");
        setStats(res.data);
      } catch (err) {
        setStats({
          totalStudents: 0,
          votedCount: 0,
          notVotedCount: 0,
        });
      }
    };
    fetchStats();
  }, []);

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      padding: "2rem",
      margin: "2rem auto",
      maxWidth: 500
    }}>
      <h2 style={{ color: "#08123b", marginBottom: "1.5rem" }}>Student Voting Info</h2>
      <div style={{ fontSize: "1.1rem", lineHeight: "2" }}>
        <div><strong>Total Students:</strong> {stats.totalStudents}</div>
        <div><strong>Voted Students:</strong> {stats.votedCount}</div>
        <div><strong>Not Voted Students:</strong> {stats.notVotedCount}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;