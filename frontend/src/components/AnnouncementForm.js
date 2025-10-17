import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AnnouncementForm = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter an announcement message.");
      return;
    }

    // You can integrate with backend later
    toast.success("Announcement sent successfully!");
    setMessage("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Post Announcement</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <textarea
            rows="4"
            placeholder="Write your announcement here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Post Announcement
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AnnouncementForm;