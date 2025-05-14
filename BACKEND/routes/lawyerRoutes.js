const express = require("express");
const router = express.Router();
const { getAllLawyers } = require("../controllers/lawyerController");

router.get("/", getAllLawyers);

module.exports = router;
