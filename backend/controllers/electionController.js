const Election = require("../models/Election");

// Create new election
exports.createElection = async (req, res) => {
  try {
    const { post, startDate, endDate, description } = req.body;
    if (!post || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const election = new Election({
      post,
      startDate,
      endDate,
      description
    });
    await election.save();
    res.status(201).json(election);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all elections
exports.getAllElections = async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};