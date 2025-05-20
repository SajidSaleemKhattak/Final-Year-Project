const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Lawyer = require("../models/Lawyer");

// Create a new review
router.post("/", async (req, res) => {
  try {
    const { appointmentId, lawyerId, userId, userName, review } = req.body;

    // Create the review
    const newReview = new Review({
      appointmentId,
      lawyerId,
      userId,
      userName,
      review,
    });

    await newReview.save();

    // Add the review to the lawyer's reviews array
    await Lawyer.findByIdAndUpdate(lawyerId, {
      $push: { reviews: newReview._id },
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Error creating review" });
  }
});

// Get reviews for a lawyer
router.get("/lawyer/:lawyerId", async (req, res) => {
  try {
    const reviews = await Review.find({ lawyerId: req.params.lawyerId }).sort({
      createdAt: -1,
    });
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

module.exports = router;
