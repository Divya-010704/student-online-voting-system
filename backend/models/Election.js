const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
  post: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String }
});

module.exports = mongoose.model("Election", electionSchema);