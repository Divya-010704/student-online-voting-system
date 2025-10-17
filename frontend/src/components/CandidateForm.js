// src/components/CandidateForm.js
import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./CandidateForm.css";

const CandidateForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    position: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        position: formData.position
      };
      const response = await api.post("/candidates", payload);

      // ✅ Clear form data before navigating
      setFormData({ name: "", position: "" });

      // ✅ Show alert first
      alert("Candidate added successfully!");

      // ✅ Then navigate after short delay
      setTimeout(() => {
        navigate("/admin/candidates");
      }, 100);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      alert(`Failed to add candidate: ${errorMessage}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="candidate-form-container">
      <h2>Add New Candidate</h2>
      <hr className="form-divider" />
      <div>
        <label>Candidate Name:</label><br />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Select Position:</label><br />
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Position --</option>
          <option value="President">President</option>
          <option value="Vice President">Vice President</option>
          <option value="General Secretary">General Secretary</option>
        </select>
      </div>

      <div className="candidate-form-actions">
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={() => setFormData({ name: '', position: '' })}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default CandidateForm;
