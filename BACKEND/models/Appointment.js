const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  status: String,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
