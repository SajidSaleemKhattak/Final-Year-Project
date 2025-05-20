const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRouter");
const lawyerRoutes = require("./routes/lawyerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const emailRoutes = require("./routes/emailRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const http = require("http");
const setupChatSocket = require("./socket/chatSocket");
const paymentRoutes = require("./routes/payments");

dotenv.config();
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Make io available to our routes
app.set("io", io);

// Setup chat socket handlers
setupChatSocket(io);

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
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
app.use("/api/bookings", bookingRoutes);
app.use("/api", emailRoutes);
app.use("/api", paymentRoutes);
app.use("/api/reviews", reviewRoutes);

// Chat routes
const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);

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

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
