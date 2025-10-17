const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { getAllStudents, deleteStudent } = require('../controllers/studentController');

// === Routes from first version ===
// Fetch student by studentId
router.get('/student/:studentId', async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// === Routes from second version ===
router.get("/", getAllStudents);
router.delete("/:id", deleteStudent);

module.exports = router;