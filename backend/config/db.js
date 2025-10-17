const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/student_voting", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected to student_voting");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
module.exports = connectDB;