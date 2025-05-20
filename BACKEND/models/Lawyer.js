const mongoose = require("mongoose");

const lawyerSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["client", "lawyer"], required: true },
    phoneNumber: String,
    location: String,
    bio: String,
    profilePicture: { type: String, default: "" },
    areasOfPractice: [String],
    totalCases: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lawyer", lawyerSchema);
