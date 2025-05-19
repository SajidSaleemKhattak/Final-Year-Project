const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create a new booking
router.post("/", async (req, res) => {
  try {
    const { lawyerId, userName, userEmail, date, time, status } = req.body;

    const booking = new Booking({
      lawyerId,
      userName,
      userEmail,
      date,
      time,
      status,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking" });
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
