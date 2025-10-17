import React, { useEffect, useState } from "react";
import api from "../services/api";

const VoterTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/students");
        setStudents(res.data);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await api.delete(`/students/${id}`);
        setStudents(students.filter((s) => s._id !== id));
        alert("Student deleted successfully!");
      } catch (err) {
        alert("Failed to delete student.");
      }
    }
  };

  return (
    <table style={{
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "1rem"
    }}>
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Student ID</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Gender</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Age</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Voted</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s._id}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{s.name}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{s.studentId}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{s.email}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{s.gender}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{s.age}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{s.voted ? "Yes" : "No"}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              <button onClick={() => handleDelete(s._id)} style={{
                padding: "5px 10px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                cursor: "pointer"
              }}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VoterTable;