const express = require("express");
const router = express.Router();
const Lawyer = require("../models/Lawyer");

// Get lawyer by ID
router.get("/:id", async (req, res) => {
  console.log("Fetching lawyer with ID:", req.params.id);
  try {
    const lawyer = await Lawyer.findById(req.params.id).select("-password");
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

module.exports = router;
