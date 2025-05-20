const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userName: String,
  userImage: String,
  rating: { type: Number, min: 1, max: 5 },
  date: { type: Date, default: Date.now },
  message: String,
});

const lawyerSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    phoneNumber: String,
    location: String,
    profilePicture: String,
    role: { type: String, enum: ["client", "lawyer"], required: true },
    areasOfPractice: [String],
    about: String,
    biography: String,
    languages: [String],
    experience: String,
    rates: String,
    totalCases: { type: Number, default: 0 },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lawyer", lawyerSchema);
