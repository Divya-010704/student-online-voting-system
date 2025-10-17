// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Route imports
const adminRoutes = require("./routes/adminRoutes");
const electionRoutes = require("./routes/electionRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const studentRoutes = require("./routes/studentRoutes");
const voteRoutes = require("./routes/voteRoutes");
const authRoutes = require('./routes/authRoutes');
const legacyStudentRoutes = require('./routes/studentRoutes'); // renamed for clarity if needed

// Load environment variables
dotenv.config();

// Import DB connection
const connectDB = require("./config/db"); // this exports a function that connects to MongoDB

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes (modern structure)
app.use("/api/admin", adminRoutes);
app.use("/api/elections", electionRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/votes", voteRoutes);

// Legacy routes (optional - you may want to deprecate these later)
app.use('/api', legacyStudentRoutes); // e.g., /api/student
app.use('/api/auth', authRoutes);     // e.g., /api/auth/login

// Connect to MongoDB using the external config
connectDB(); // This handles DB connection and error logging

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});