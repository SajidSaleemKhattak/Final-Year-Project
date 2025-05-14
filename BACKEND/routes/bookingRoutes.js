const express = require("express");
const router = express.Router();
const { sendBookingEmail } = require("../controllers/bookingController");

router.post("/", sendBookingEmail);

module.exports = router;
