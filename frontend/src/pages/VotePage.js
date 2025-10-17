import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import "./VotePage.css";

const VotePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const electionId = query.get("electionId");
  const post = query.get("post");

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [centerMessage, setCenterMessage] = useState(""); // For center pop message
  const [alreadyVoted, setAlreadyVoted] = useState(false); // For already voted popup
  const [showSelectCandidate, setShowSelectCandidate] = useState(false); // For select candidate popup

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Fetch candidates by position (post) instead of electionId
        const res = await api.get(`/candidates/position/${post}`);
        setCandidates(res.data);
      } catch (err) {
        alert("Failed to load candidates.");
      }
      setLoading(false);
    };
    if (post) fetchCandidates();
  }, [post]);

  const handleVote = async (e) => {
    e.preventDefault();
    if (!selectedCandidate) {
      setShowSelectCandidate(true);
      return;
    }
    // Get voter ID from localStorage (or your auth/session management)
    const voter = localStorage.getItem("studentId");
    if (!voter) {
      alert("Voter not found. Please log in again.");
      navigate("/userlogin");
      return;
    }
    try {
      await api.post(`/votes`, {
        candidateId: selectedCandidate,
        electionId,
        voter // <-- Required by backend
      });
      setVoted(true);
      setCenterMessage("Your vote has been cast successfully!");
      setTimeout(() => {
        setCenterMessage("");
        navigate("/elections");
      }, 2000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Failed to cast vote. You may have already voted.";
      if (msg === "You have already voted.") {
        setAlreadyVoted(true);
      } else {
        setCenterMessage(msg);
        setTimeout(() => setCenterMessage(""), 2000);
      }
    }
  };

  if (loading) return <div>Loading candidates...</div>;

  return (
    <div className="vote-page-wrapper">
      {/* Centered pop-up message for success, error */}
      {centerMessage && (
        <div className="vote-center-popup">
          <div className="vote-center-popup-content">
            <div style={{ marginBottom: 16 }}>{centerMessage}</div>
            <button
              className="vote-popup-ok-btn"
              onClick={() => {
                setCenterMessage("");
                navigate("/dashboard");
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Already voted popup with OK button */}
      {alreadyVoted && (
        <div className="vote-center-popup">
          <div className="vote-center-popup-content">
            <div style={{ marginBottom: 16 }}>You have already voted.</div>
            <button
              className="vote-popup-ok-btn"
              onClick={() => setAlreadyVoted(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Please select a candidate popup with OK button */}
      {showSelectCandidate && (
        <div className="vote-center-popup">
          <div className="vote-center-popup-content">
            <div style={{ marginBottom: 16 }}>Please select a candidate.</div>
            <button
              className="vote-popup-ok-btn"
              onClick={() => setShowSelectCandidate(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* 👇 Back Button Added Here */}
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
        onClick={() => navigate("/dashboard")}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#eab308")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#facc15")}
      >
        Back
      </button>

      {/* Main Container */}
      <div
        className="vote-container"
        style={{
          maxWidth: 500,
          margin: "40px auto",
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          padding: "2rem 2.2rem",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#08123b" }}>
          {post} Election - Cast Your Vote
        </h2>
        {candidates.length === 0 ? (
          <p>No candidates available for this election.</p>
        ) : (
          <form onSubmit={handleVote}>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {candidates.map((candidate) => (
                <li
                  key={candidate._id}
                  style={{
                    marginBottom: 16,
                    borderBottom: "1px solid #eee",
                    paddingBottom: 8,
                  }}
                >
                  <label style={{ cursor: "pointer" }}>
                    <input
                      type="radio"
                      name="candidate"
                      value={candidate._id}
                      checked={selectedCandidate === candidate._id}
                      onChange={() => setSelectedCandidate(candidate._id)}
                      style={{ marginRight: 10 }}
                    />
                    <span style={{ fontWeight: 600 }}>{candidate.name}</span>
                    {candidate.bio && (
                      <span style={{ marginLeft: 8, color: "#666" }}>
                        ({candidate.bio})
                      </span>
                    )}
                  </label>
                </li>
              ))}
            </ul>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px 0",
                backgroundColor: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 7,
                fontWeight: 700,
                fontSize: "1.08rem",
                cursor: "pointer",
                transition: "background 0.2s"
              }}
            >
              Cast Vote
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VotePage;