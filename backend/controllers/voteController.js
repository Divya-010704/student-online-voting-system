// backend/controllers/voteController.js

const Vote = require("../models/Vote");
const Student = require("../models/Student");

/**
 * Create a new vote (simplified version)
 */
exports.createVote = async (req, res, next) => {
  try {
    const { electionId, candidateId } = req.body;

    // Validate input
    if (!electionId || !candidateId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const vote = new Vote({
      election: electionId,
      candidate: candidateId,
    });

    await vote.save();
    res.status(201).json({ message: "Vote saved successfully" });
  } catch (err) {
    next(err);
  }
};

/**
 * Submit a vote for a candidate in an election (with validation)
 */
exports.voteForCandidate = async (req, res) => {
  const { userId, candidateId, electionId } = req.body;

  // Check if user has already voted in this election
  const existingVote = await Vote.findOne({ studentId: userId, electionId });
  if (existingVote) {
    return res.status(400).json({ error: 'You have already voted in this election.' });
  }

  try {
    const newVote = new Vote({
      studentId: userId,
      candidateId,
      electionId
    });

    await newVote.save();

    // Optional: Update student's voted status
    await Student.findByIdAndUpdate(userId, { voted: true });

    res.status(200).json({ success: true, message: 'Vote submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit vote' });
  }
};

/**
 * Get voting statistics (total voters, voted count, not voted)
 */
exports.getVoteStats = async (req, res) => {
  try {
    const totalVoters = await Student.countDocuments();
    const votedCount = await Student.countDocuments({ voted: true });

    res.json({
      totalVoters,
      votedCount,
      notVoted: totalVoters - votedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get full vote logs with populated references
 */
exports.getVoteLogs = async (req, res) => {
  try {
    const logs = await Vote.find()
      .populate("studentId", "name studentId")
      .populate("candidateId", "name position")
      .populate("electionId", "name");

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};