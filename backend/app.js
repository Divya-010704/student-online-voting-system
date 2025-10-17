// backend/app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/student.routes');
const authRoutes = require('./routes/auth.routes');
const candidateRoutes = require('./routes/candidateRoutes'); // 👈 Already added
const electionRoutes = require('./routes/electionRoutes');   // 👈 Newly added

require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Keep your existing routes
app.use('/api/students', studentRoutes);  // GET student details
app.use('/api/auth', authRoutes);         // POST register, login
app.use('/api/candidates', candidateRoutes); // 👍 Already added
app.use('/api/elections', electionRoutes);   // ✅ Newly added here

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;