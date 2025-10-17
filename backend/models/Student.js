const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  studentId: { type: String, unique: true, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  branch: { type: String, required: true },
  yearOfStudy: { type: Number, required: true }
});

module.exports = mongoose.model('Student', studentSchema);