import React, { useEffect, useState } from "react";
import api from "../services/api";
import "./Results.css";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components for Pie chart
Chart.register(ArcElement, Tooltip, Legend);

const Results = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get("/elections/with-results");
        setElections(res.data);
      } catch (err) {
        setElections([]);
      }
      setLoading(false);
    };
    fetchResults();
  }, []);

  if (loading) return <div className="results-container">Loading results...</div>;

  return (
    <div className="results-container">
      <h2>Election Results</h2>
      {elections.length === 0 ? (
        <p className="no-results">No results available.</p>
      ) : (
        elections.map((election) => (
          <div key={election._id} className="election-block">
            <div className="election-title">
              {election.title} ({election.post})
              <span
                className={`election-status ${
                  election.status === "Completed" ? "completed" : "ongoing"
                }`}
              >
                {election.status}
              </span>
            </div>
            <div style={{ maxWidth: 400, margin: "0 auto" }}>
              {election.results && election.results.length > 0 ? (
                <Pie
                  data={{
                    labels: election.results.map((result) => result.candidateName),
                    datasets: [
                      {
                        label: "Votes",
                        data: election.results.map((result) => result.votes),
                        backgroundColor: [
                          "#facc15",
                          "#2563eb",
                          "#22d3ee",
                          "#f87171",
                          "#34d399",
                          "#a78bfa",
                          "#fbbf24",
                          "#f472b6",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: true, position: "bottom" },
                      tooltip: { enabled: true },
                    },
                  }}
                />
              ) : (
                <p style={{ textAlign: "center", margin: "1rem 0" }}>No votes yet.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Results;