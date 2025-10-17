const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  password: String,
  hasVoted: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);