const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRouter");
const lawyerRoutes = require("./routes/lawyerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const emailRoutes = require("./routes/emailRoutes"); // Add this line
require("dotenv").config();
const socketIo = require("socket.io");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/book", bookingRoutes);
app.use("/api", emailRoutes); // Add this line for email routes

// Health Check Endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Legal Consultation API is running",
    timestamp: new Date().toISOString(),
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server running on port ${PORT} in ${
      process.env.NODE_ENV || "development"
    } mode`
  )
);

module.exports = app;
