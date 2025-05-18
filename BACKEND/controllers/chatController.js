const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");
const Lawyer = require("../models/Lawyer");

// Get chat history between user and lawyer
const getChatHistory = async (req, res) => {
  try {
    const { userId, lawyerId } = req.params;

    // Find or create chat
    let chat = await Chat.findOne({
      participants: {
        $all: [userId, lawyerId],
      },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [userId, lawyerId],
        messages: [],
      });
    }

    // Get user and lawyer details
    const [user, lawyer] = await Promise.all([
      User.findById(userId).select("name email profilePicture"),
      Lawyer.findById(lawyerId).select("name email profilePicture"),
    ]);

    const chatData = {
      _id: chat._id,
      participants: chat.participants,
      messages: chat.messages,
      lastMessage: chat.lastMessage,
      userName: user?.name,
      userEmail: user?.email,
      userImage: user?.profilePicture,
      lawyerName: lawyer?.name,
      lawyerEmail: lawyer?.email,
      lawyerImage: lawyer?.profilePicture,
    };

    res.json(chatData);
  } catch (error) {
    console.error("Error getting chat history:", error);
    res.status(500).json({ message: "Error getting chat history" });
  }
};

// Get all chats for a lawyer
const getLawyerChats = async (req, res) => {
  try {
    const { lawyerId } = req.params;

    const chats = await Chat.find({
      participants: lawyerId,
    }).sort({ updatedAt: -1 });

    // Get all unique user IDs from chats
    const userIds = [
      ...new Set(
        chats.flatMap((chat) =>
          chat.participants.filter((p) => p.toString() !== lawyerId)
        )
      ),
    ];

    // Get user details
    const users = await User.find({ _id: { $in: userIds } }).select(
      "name email profilePicture"
    );

    // Map user details to chats
    const chatsWithDetails = chats.map((chat) => {
      const userId = chat.participants.find((p) => p.toString() !== lawyerId);
      const user = users.find((u) => u._id.toString() === userId.toString());

      return {
        _id: chat._id,
        participants: chat.participants,
        messages: chat.messages,
        lastMessage: chat.lastMessage,
        userName: user?.name,
        userEmail: user?.email,
        userImage: user?.profilePicture,
        updatedAt: chat.updatedAt,
      };
    });

    res.json(chatsWithDetails);
  } catch (error) {
    console.error("Error getting lawyer chats:", error);
    res.status(500).json({ message: "Error getting lawyer chats" });
  }
};

// Get all chats for a user
const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;

    const chats = await Chat.find({
      participants: userId,
    }).sort({ updatedAt: -1 });

    // Get all unique lawyer IDs from chats
    const lawyerIds = [
      ...new Set(
        chats.flatMap((chat) =>
          chat.participants.filter((p) => p.toString() !== userId)
        )
      ),
    ];

    // Get lawyer details
    const lawyers = await Lawyer.find({ _id: { $in: lawyerIds } }).select(
      "name email profilePicture"
    );

    // Map lawyer details to chats
    const chatsWithDetails = chats.map((chat) => {
      const lawyerId = chat.participants.find((p) => p.toString() !== userId);
      const lawyer = lawyers.find(
        (l) => l._id.toString() === lawyerId.toString()
      );

      return {
        _id: chat._id,
        participants: chat.participants,
        messages: chat.messages,
        lastMessage: chat.lastMessage,
        lawyerName: lawyer?.name,
        lawyerEmail: lawyer?.email,
        lawyerImage: lawyer?.profilePicture,
        updatedAt: chat.updatedAt,
      };
    });

    res.json(chatsWithDetails);
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

// Create a new message
const createMessage = async (req, res) => {
  try {
    const { chatId, senderId, senderType, receiverId, receiverType, message } =
      req.body;

    // Find or create chat
    let chat = await Chat.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    // Create new message
    const newMessage = {
      senderId,
      senderType,
      receiverId,
      receiverType,
      message,
      timestamp: new Date(),
      read: false,
    };

    // Add message to chat and update lastMessage
    chat.messages.push(newMessage);
    chat.lastMessage = newMessage;
    await chat.save();

    // Return the saved message without emitting socket event
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ message: "Error creating message" });
  }
};

module.exports = {
  getChatHistory,
  getLawyerChats,
  getUserChats,
  markMessagesAsRead,
  createMessage,
};
