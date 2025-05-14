const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Message = require("../models/Message");
const Appointment = require("../models/Appointment");
const Transaction = require("../models/Transaction");

exports.signup = async (req, res) => {
  console.log("Signup Hit");
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("Login Hit");
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Fetch associated data
    const messages = await Message.find({ userId: user._id });
    const appointments = await Appointment.find({ userId: user._id });
    const transactions = await Transaction.find({ userId: user._id });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id,
        messages,
        appointments,
        transactions,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
