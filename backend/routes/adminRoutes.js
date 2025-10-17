const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Vote = require('../models/Vote');

router.get('/voting-stats', async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const votedStudents = await Vote.distinct('voter');
    const votedCount = votedStudents.length;
    const notVotedCount = totalStudents - votedCount;
    res.json({
      totalStudents,
      votedCount,
      notVotedCount
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

module.exports = router;