const express = require("express");
const router = express.Router();
const electionController = require("../controllers/electionController");
const { getCandidatesByElection } = require("../controllers/candidateController");

const Election = require("../models/Election");
const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");

// Election CRUD Routes
router.post("/", electionController.createElection);
router.get("/", electionController.getAllElections);

// Get candidates by election ID
router.get("/:electionId/candidates", getCandidatesByElection);

// Get only completed elections with results (by post and _id)
router.get('/with-results', async (req, res) => {
  try {
    const now = new Date();
    const elections = await Election.find();
    const results = [];

    for (const election of elections) {
      // Determine status based on dates
      let status = "Upcoming";
      if (now >= election.startDate && now <= election.endDate) status = "Ongoing";
      else if (now > election.endDate) status = "Completed";

      // Only include completed elections
      if (status === "Completed") {
        const candidates = await Candidate.find({ position: election.post });
        const candidateResults = await Promise.all(
          candidates.map(async (candidate) => {
            const votes = await Vote.countDocuments({
              candidateId: candidate._id,
              electionId: election._id.toString()
            });
            return {
              candidateId: candidate._id,
              candidateName: candidate.name,
              votes
            };
          })
        );
        results.push({
          _id: election._id,
          title: election.post,
          post: election.post,
          status,
          results: candidateResults
        });
      }
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Error fetching results" });
  }
});

module.exports = router;