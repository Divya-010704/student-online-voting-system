const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
  electionId: { type: String }, // Optional if you don't use electionId
  // You should have a unique identifier for the voter (e.g., studentId, userId, or IP)
  voter: { type: String, required: true }
});

module.exports = mongoose.model("Vote", voteSchema);