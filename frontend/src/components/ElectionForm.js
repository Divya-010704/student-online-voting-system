import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const ElectionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    post: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    description: ""
  });

  // Reset form data whenever the component mounts
  useEffect(() => {
    setFormData({
      post: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      description: ""
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine date and time for backend
    const start = formData.startDate && formData.startTime ? `${formData.startDate}T${formData.startTime}` : "";
    const end = formData.endDate && formData.endTime ? `${formData.endDate}T${formData.endTime}` : "";

    const payload = {
      post: formData.post,
      startDate: start,
      endDate: end,
      description: formData.description
    };

    try {
      await api.post("/elections", payload);
      alert("Election created successfully!");

      // 👇 Reset the form after successful submission
      setFormData({
        post: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        description: ""
      });

      navigate("/admin/elections");
    } catch (err) {
      alert("Failed to create election.");
    }
  };

  const handleCancel = () => {
    setFormData({
      post: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      description: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "480px", margin: "40px auto", background: "#fff", borderRadius: 14, boxShadow: "0 4px 24px rgba(0,0,0,0.10)", padding: "2rem 2.2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: 18, color: "#08123b", letterSpacing: 1 }}>➕ Create New Election</h2>
      <div style={{ marginBottom: "1.1rem" }}>
        <label style={{ fontWeight: 600 }}>🪪 Post:</label><br />
        <select
          name="post"
          value={formData.post}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", borderRadius: 7, border: "1px solid #d1d5db", fontSize: 16 }}
        >
          <option value="">-- Select Post --</option>
          <option value="President">President</option>
          <option value="Vice President">Vice President</option>
          <option value="General Secretary">General Secretary</option>
        </select>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: "1.1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: 600 }}>📅 Start Date:</label><br />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: 7, border: "1px solid #d1d5db", fontSize: 16 }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: 600 }}>🕘 Start Time:</label><br />
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: 7, border: "1px solid #d1d5db", fontSize: 16 }}
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: "1.1rem" }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: 600 }}>📅 End Date:</label><br />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: 7, border: "1px solid #d1d5db", fontSize: 16 }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: 600 }}>🕔 End Time:</label><br />
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: 7, border: "1px solid #d1d5db", fontSize: 16 }}
          />
        </div>
      </div>
      <div style={{ marginBottom: "1.1rem" }}>
        <label style={{ fontWeight: 600 }}>📝 Description (optional):</label><br />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Optional notes..."
          style={{ width: "100%", padding: "10px", borderRadius: 7, border: "1px solid #d1d5db", fontSize: 16, resize: "vertical" }}
        />
      </div>
      <div style={{ display: "flex", gap: "1.2rem", marginTop: 18 }}>
        <button type="submit" style={{
          flex: 1,
          padding: "12px 0",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 7,
          fontWeight: 700,
          fontSize: "1.08rem",
          cursor: "pointer",
          transition: "background 0.2s"
        }}>
          Create Election
        </button>
        <button type="button" onClick={handleCancel} style={{
          flex: 1,
          padding: "12px 0",
          backgroundColor: "#e0e0e0",
          color: "#2563eb",
          border: "none",
          borderRadius: 7,
          fontWeight: 700,
          fontSize: "1.08rem",
          cursor: "pointer",
          transition: "background 0.2s"
        }}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ElectionForm;