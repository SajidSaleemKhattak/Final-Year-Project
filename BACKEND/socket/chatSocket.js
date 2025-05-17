const Chat = require("../models/Chat");
const Message = require("../models/Message");

const setupChatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join a chat room
    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
      console.log(`User ${socket.id} joined chat: ${chatId}`);
    });

    // Handle new message
    socket.on("send_message", async (messageData) => {
      try {
        const { chatId, senderId, content } = messageData;

        // Save message to database
        const newMessage = new Message({
          chat: chatId,
          sender: senderId,
          content: content,
        });
        await newMessage.save();

        // Update last message in chat
        await Chat.findByIdAndUpdate(chatId, {
          lastMessage: newMessage._id,
        });

        // Broadcast message to all users in the chat room
        io.to(chatId).emit("receive_message", {
          _id: newMessage._id,
          chat: chatId,
          sender: senderId,
          content: content,
          createdAt: newMessage.createdAt,
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    // Handle typing status
    socket.on("typing", (data) => {
      const { chatId, userId } = data;
      socket.to(chatId).emit("user_typing", { chatId, userId });
    });

    socket.on("stop_typing", (data) => {
      const { chatId, userId } = data;
      socket.to(chatId).emit("user_stop_typing", { chatId, userId });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = setupChatSocket;
