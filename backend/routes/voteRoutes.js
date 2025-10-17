const express = require("express");
const router = express.Router();
const Vote = require("../models/Vote");

// POST /api/votes
router.post("/", async (req, res) => {
  try {
    const { candidateId, electionId, voter } = req.body;
    // Prevent double voting by the same voter for the same election
    const existingVote = await Vote.findOne({ voter, electionId });
    if (existingVote) {
      return res.status(400).json({ message: "You have already voted." });
    }
    const vote = new Vote({ candidateId, electionId, voter });
    await vote.save();
    res.status(201).json(vote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;