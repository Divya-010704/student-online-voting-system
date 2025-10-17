import React, { useEffect, useState } from "react";
import axios from "axios";
import './CandidatesPage.css'; // Make sure this path is correct

// Helper to group candidates by position
const groupByPosition = (candidates) => {
  const grouped = {};
  candidates.forEach(candidate => {
    if (!grouped[candidate.position]) {
      grouped[candidate.position] = [];
    }
    grouped[candidate.position].push(candidate);
  });
  return grouped;
};

const CandidatesPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/candidates");
        setCandidates(res.data);
      } catch (err) {
        console.error("Error fetching candidates:", err);
        alert("Failed to load candidates.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) return <p>Loading candidates...</p>;

  // Group candidates by position
  const grouped = groupByPosition(candidates);

  return (
    <div className="candidates-page">
      <h2 className="page-title">Candidates</h2>

      {candidates.length === 0 ? (
        <p className="no-candidates">No candidates found.</p>
      ) : (
        <>
          {["President", "Vice President", "General Secretary"].map((position) => (
            <div key={position} className="candidate-group-container">
              <h3>{position}</h3>
              <ul className="candidate-list">
                {(grouped[position] || []).length === 0 ? (
                  <li className="no-candidates">No candidates for this post.</li>
                ) : (
                  grouped[position].map(candidate => (
                    <li key={candidate._id} className="candidate-item">
                      <strong>{candidate.name}</strong> - {candidate.position}
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CandidatesPage;