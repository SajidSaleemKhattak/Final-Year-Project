const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const mongoose = require("mongoose");

// Create a new booking
router.post("/", async (req, res) => {
  try {
    const { lawyerId, userName, userEmail, date, time, status, paymentMethod } =
      req.body;

    const booking = new Booking({
      lawyerId,
      userName,
      userEmail,
      date,
      time,
      status,
      paymentMethod,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking" });
  }
});

// Get booking statistics for a lawyer
router.get("/stats/:lawyerId", async (req, res) => {
  try {
    const { lawyerId } = req.params;

    // Validate lawyerId
    if (!mongoose.Types.ObjectId.isValid(lawyerId)) {
      return res.status(400).json({ message: "Invalid lawyer ID" });
    }

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get all bookings for this lawyer
    const bookings = await Booking.find({ lawyerId });

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
        bookingDate.setHours(0, 0, 0, 0);
        return bookingDate.getTime() === today.getTime();
      }).length,
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching booking statistics:", error);
    res.status(500).json({ message: "Error fetching booking statistics" });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const { userEmail, lawyerId, status } = req.query;
    const query = {};

    if (userEmail) query.userEmail = userEmail;
    if (lawyerId) {
      // Ensure lawyerId is an ObjectId
      query.lawyerId = mongoose.Types.ObjectId.isValid(lawyerId)
        ? new mongoose.Types.ObjectId(lawyerId)
        : lawyerId;
    }
    if (status) query.status = status;

    const bookings = await Booking.find(query)
      .populate("lawyerId", "name email")
      .sort({ createdAt: -1 });

    // Transform the data to include lawyer name
    const transformedBookings = bookings.map((booking) => ({
      ...booking.toObject(),
      lawyerName: booking.lawyerId?.name,
    }));

    res.json(transformedBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// Get booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Error fetching booking" });
  }
});

// Update booking status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: "Error updating booking status" });
  }
});

module.exports = router;
