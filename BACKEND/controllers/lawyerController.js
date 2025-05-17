const Lawyer = require("../models/Lawyer");

exports.getAllLawyers = async (req, res) => {
  console.log("Lawyers api hit");
  try {
    const lawyers = await Lawyer.find().limit(20);
    res.json(lawyers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
