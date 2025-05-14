const User = require("../models/User");

exports.getAllLawyers = async (req, res) => {
  console.log("Lawyers api hit");
  try {
    const lawyers = await User.find({ role: "lawyer" }).limit(10);
    res.json(lawyers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
