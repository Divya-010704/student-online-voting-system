const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");
const Candidate = require("../models/Candidate");
// Get all candidates
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new candidate
router.post("/", async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).json(candidate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Get all candidates for a specific position (post)
router.get("/position/:position", async (req, res) => {
  try {
    const candidates = await Candidate.find({ position: req.params.position });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;