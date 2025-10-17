const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register route
router.post('/register', async (req, res) => {
  const { studentId, password } = req.body;

  // Check if student exists in main collection
  const studentExists = await require('../models/Student').findOne({ studentId });
  if (!studentExists) return res.status(400).json({ message: 'Invalid student ID' });

  // Check if user already registered
  const existingUser = await User.findOne({ studentId });
  if (existingUser) return res.status(400).json({ message: 'Student already registered' });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ studentId, password: hashedPassword });
  try {
    await newUser.save();
    res.json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { studentId, password } = req.body;

  const user = await User.findOne({ studentId });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  res.json({ message: 'Login successful' });
});

// 👇 New route added here — don't change anything above
// Check if user has voted
router.post('/check-vote', async (req, res) => {
  const { studentId } = req.body;

  const user = await User.findOne({ studentId });
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ hasVoted: user.hasVoted || false });
});

// ✅ No changes made to your existing routes

module.exports = router;