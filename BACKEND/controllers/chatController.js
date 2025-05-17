const Chat = require("../models/Chat");
const Message = require("../models/Message");

// Get chat history between user and lawyer
const getChatHistory = async (req, res) => {
  try {
    const { userId, lawyerId } = req.params;

    // Find or create chat
    let chat = await Chat.findOne({
      participants: {
        $all: [userId, lawyerId],
      },
    }).populate("messages");

    if (!chat) {
      chat = await Chat.create({
        participants: [userId, lawyerId],
        messages: [],
      });
    }

    res.json(chat);
  } catch (error) {
    console.error("Error getting chat history:", error);
    res.status(500).json({ message: "Error getting chat history" });
  }
};

// Get all chats for a user
const getUserChats = async (req, res) => {
  try {
    const { userId, userType } = req.params;

    const chats = await Chat.find({
      participants: userId,
    })
      .populate("participants", "name email")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    console.error("Error getting user chats:", error);
    res.status(500).json({ message: "Error getting user chats" });
  }
};

// Mark messages as read
const markMessagesAsRead = async (req, res) => {
  try {
    const { chatId, userId } = req.params;

    await Message.updateMany(
      {
        chat: chatId,
        sender: { $ne: userId },
        read: false,
      },
      {
        read: true,
      }
    );

    res.json({ message: "Messages marked as read" });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({ message: "Error marking messages as read" });
  }
};

module.exports = {
  getChatHistory,
  getUserChats,
  markMessagesAsRead,
};
