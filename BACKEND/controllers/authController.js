const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Message = require("../models/Message");
const Appointment = require("../models/Appointment");
const Transaction = require("../models/Transaction");
const Lawyer = require("../models/Lawyer");

exports.signup = async (req, res) => {
  console.log("Signup Hit");
  try {
    const { name, email, password, role } = req.body;
    if (role == "client") {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, role });
      await user.save();
      res.status(201).json({ message: "User created successfully" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const lawyer = new Lawyer({
        name,
        email,
        password: hashedPassword,
        role,
        bio: req.body.bio || "",
        tags: req.body.tags || [],
        totalCases: 0,
      });
      if (role == "client") {
        await user.save();
        res.status(201).json({ message: "User created successfully" });
      } else if (role == "lawyer") {
        await lawyer.save();
        res.status(201).json({ message: "Lawyer created successfully" });
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { role } = req.body;
  if (role == "client") {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log("Login Hit");
      if (!user) return res.status(404).json({ error: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Invalid credentials" });

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
  } else if (role == "lawyer") {
    try {
      const { email, password } = req.body;
      const lawyer = await Lawyer.findOne({ email });
      if (!lawyer) return res.status(404).json({ error: "Lawyer not found" });

      const isMatch = await bcrypt.compare(password, lawyer.password);
      if (!isMatch)
        return res.status(400).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { id: lawyer._id, role: lawyer.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.status(200).json({
        success: true,
        token,
        lawyer: {
          name: lawyer.name,
          email: lawyer.email,
          role: lawyer.role,
          _id: lawyer._id,
          bio: lawyer.bio,
          tags: lawyer.tags,
          totalCases: lawyer.totalCases,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
