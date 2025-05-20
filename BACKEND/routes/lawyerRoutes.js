const express = require("express");
const router = express.Router();
const Lawyer = require("../models/Lawyer");
const Booking = require("../models/Booking");
const Review = require("../models/Review");
const Chat = require("../models/Chat");

// Get all lawyers
router.get("/", async (req, res) => {
  console.log("Fetching all lawyers");
  try {
    const lawyers = await Lawyer.find().select("-password");
    console.log("Found lawyers count:", lawyers.length);
    res.json(lawyers);
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get lawyer dashboard data
router.get("/dashboard/:id", async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id).select("-password");
    if (!lawyer) {
      return res.status(404).json({ message: "Lawyer not found" });
    }

    // Get all bookings for this lawyer
    const bookings = await Booking.find({ lawyerId: req.params.id });

    // Calculate statistics
    const stats = {
      total: bookings.length,
      completed: bookings.filter((booking) => booking.status === "confirmed")
        .length,
      pending: bookings.filter((booking) => booking.status === "pending")
        .length,
      cancelled: bookings.filter((booking) => booking.status === "cancelled")
        .length,
      today: bookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        const today = new Date();
        return bookingDate.toDateString() === today.toDateString();
      }).length,
    };

    res.json({
      bio: lawyer.bio || "",
      stats,
    });
  } catch (error) {
    console.error("Error fetching lawyer dashboard data:", error);
    res.status(500).json({ message: "Error fetching lawyer dashboard data" });
  }
});

// Get lawyer by ID
router.get("/:id", async (req, res) => {
  console.log("Fetching lawyer with ID:", req.params.id);
  try {
    const lawyer = await Lawyer.findById(req.params.id)
      .select("-password")
      .populate({
        path: "reviews",
        options: { sort: { createdAt: -1 } },
      });
    console.log("Found lawyer:", lawyer);
    if (!lawyer) {
      console.log("No lawyer found with ID:", req.params.id);
      return res.status(404).json({ message: "Lawyer not found" });
    }
    res.json(lawyer);
  } catch (error) {
    console.error("Error fetching lawyer:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update lawyer profile
router.patch("/:id", async (req, res) => {
  try {
    const {
      name,
      location,
      phoneNumber,
      languages,
      experience,
      rates,
      about,
      areasOfPractice,
    } = req.body;

    const updatedLawyer = await Lawyer.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        phoneNumber,
        languages,
        experience,
        rates,
        about,
        areasOfPractice,
      },
      { new: true }
    ).select("-password");

    if (!updatedLawyer) {
      return res.status(404).json({ message: "Lawyer not found" });
    }

    res.json(updatedLawyer);
  } catch (error) {
    console.error("Error updating lawyer:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete lawyer account
router.delete("/:id", async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) {
      return res.status(404).json({ message: "Lawyer not found" });
    }

    // Delete all associated data
    await Promise.all([
      // Delete all bookings
      Booking.deleteMany({ lawyerId: req.params.id }),
      // Delete all reviews
      Review.deleteMany({ lawyerId: req.params.id }),
      // Delete all chats
      Chat.deleteMany({ participants: req.params.id }),
      // Delete the lawyer
      Lawyer.findByIdAndDelete(req.params.id),
    ]);

    res.json({
      message: "Lawyer account and associated data deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting lawyer:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
