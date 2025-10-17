import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import './ElectionPage.css';

const ElectionPage = () => {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await api.get("/elections");
        setElections(res.data);
      } catch (err) {
        console.error("Error fetching elections:", err);
        alert("Failed to load elections.");
      }
    };
    fetchElections();
  }, []);

  // Helper for countdown
  const getCountdown = (startDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const diff = start - now;
    if (diff <= 0) return null;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Timer state for re-render
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter/sort state
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Date');

  // Compute status for each election based on current time
  const now = new Date();
  const electionsWithStatus = elections.map(e => {
    const start = new Date(e.startDate);
    const end = new Date(e.endDate);
    let status = "";
    if (now < start) status = "Upcoming";
    else if (now >= start && now <= end) status = "Ongoing";
    else status = "Previous";
    return { ...e, status };
  });

  // Filter and sort elections
  let filteredElections = electionsWithStatus;
  if (filter !== 'All') {
    filteredElections = electionsWithStatus.filter(e => e.status === filter);
  }
  if (sort === 'Date') {
    const statusOrder = { 'Ongoing': 0, 'Upcoming': 1, 'Previous': 2 };
    filteredElections = [...filteredElections].sort((a, b) => {
      if (a.status !== b.status) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return new Date(a.startDate) - new Date(b.startDate);
    });
  } else if (sort === 'Title') {
    filteredElections = [...filteredElections].sort((a, b) => (a.post || "").localeCompare(b.post || ""));
  }

  return (
    <div className="election-container">
      <h2>Available Elections</h2>
      <div style={{display:'flex', gap:16, marginBottom:16}}>
        <div>
          <label>Filter: </label>
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Previous">Previous</option>
          </select>
        </div>
        
          
      </div>

      {filteredElections.length === 0 ? (
        <p>No elections at the moment.</p>
      ) : (
        <ul className="election-list">
          {filteredElections.map((election) => (
            <li key={election._id} className="election-item">
              <h3>{election.post} Election</h3>
              <p><strong>Status:</strong> {election.status}</p>
              <p><strong>Start:</strong> {new Date(election.startDate).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(election.endDate).toLocaleString()}</p>
              {election.description && <p><strong>Description:</strong> {election.description}</p>}
              {election.status === "Upcoming" && (
                <p style={{color: 'blue'}}><strong>Starts in:</strong> {getCountdown(election.startDate)}</p>
              )}
             {election.status === "Ongoing" && (
  <div className="vote-button-container">
    <button
      className="vote-button"
      onClick={() => navigate(`/vote?electionId=${election._id}&post=${election.post}`)}
    >
      View & Vote
    </button>
  </div>
)}

              {election.status === "Upcoming" && (
                <span style={{color:'orange'}}>Starts on {new Date(election.startDate).toLocaleString()}</span>
              )}
              {election.status === "Previous" && (
                <span style={{color:'red'}}>Voting Closed</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ElectionPage;