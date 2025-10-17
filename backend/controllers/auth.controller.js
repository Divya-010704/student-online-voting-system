const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const User = require('../models/User');

// Fetch student by ID
exports.getStudentById = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Register student
exports.registerStudent = async (req, res) => {
  const { studentId, password } = req.body;

  try {
    const existingUser = await User.findOne({ studentId });
    if (existingUser) return res.status(400).json({ message: 'Student already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ studentId, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login student
exports.loginStudent = async (req, res) => {
  const { studentId, password } = req.body;

  try {
    const user = await User.findOne({ studentId });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};