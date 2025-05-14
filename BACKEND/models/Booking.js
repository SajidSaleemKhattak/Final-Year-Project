const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
