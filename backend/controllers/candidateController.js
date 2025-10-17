// backend/controllers/candidateController.js

const Candidate = require("../models/Candidate");
const Election = require("../models/Election");

// ✅ Add a new candidate
exports.createCandidate = async (req, res, next) => {
  try {
    const { name, position, electionId } = req.body;

    const candidate = new Candidate({
      name,
      position,
      electionId,
    });

    await candidate.save();
    res.status(201).json({ message: "Candidate added successfully", candidate });
  } catch (error) {
    next(error);
  }
};

// ✅ Get all candidates with populated election info
exports.getAllCandidates = async (req, res, next) => {
  try {
    const candidates = await Candidate.find().populate("electionId");
    res.json(candidates);
  } catch (error) {
    next(error);
  }
};

// ✅ Get candidates by election ID
exports.getCandidatesByElection = async (req, res, next) => {
  try {
    const candidates = await Candidate.find({ electionId: req.params.electionId });
    res.json(candidates);
  } catch (err) {
    next(err);
  }
};