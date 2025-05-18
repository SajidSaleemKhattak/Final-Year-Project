const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

// Get chat history between user and lawyer
router.get(
  "/history/:userId/:lawyerId",
  protect,
  chatController.getChatHistory
);

// Get all chats for a lawyer
router.get("/lawyer/:lawyerId", protect, chatController.getLawyerChats);

// Get all chats for a user
router.get("/user/:userId", protect, chatController.getUserChats);

// Mark messages as read
router.put("/read/:chatId/:userId", protect, chatController.markMessagesAsRead);

// Create a new message
router.post("/message", protect, chatController.createMessage);

module.exports = router;
