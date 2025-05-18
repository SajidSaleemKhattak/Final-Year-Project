const Chat = require("../models/Chat");
const Message = require("../models/Message");

const setupChatSocket = (io) => {
  const connectedUsers = new Map();

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handle user connection
    socket.on("user_connected", ({ userId, userType }) => {
      connectedUsers.set(userId, { socketId: socket.id, userType });
      console.log(`${userType} connected:`, userId);
    });

    // Join a chat room
    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
      console.log(`User ${socket.id} joined chat: ${chatId}`);
    });

    // Leave a chat room
    socket.on("leave_chat", (chatId) => {
      socket.leave(chatId);
      console.log(`User ${socket.id} left chat: ${chatId}`);
    });

    // Handle new message
    socket.on("send_message", async (messageData) => {
      try {
        const {
          chatId,
          senderId,
          senderType,
          receiverId,
          receiverType,
          message,
        } = messageData;

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

        // Emit only to the specific chat room
        socket.to(chatId || chat._id).emit("receive_message", {
          ...newMessage,
          chatId: chat._id,
        });

        // Emit back to sender to confirm message sent
        socket.emit("receive_message", {
          ...newMessage,
          chatId: chat._id,
        });

        // Notify receiver about new message only if they're not in the chat room
        const receiver = connectedUsers.get(receiverId);
        if (
          receiver &&
          !io.sockets.adapter.rooms
            .get(chatId || chat._id)
            ?.has(receiver.socketId)
        ) {
          io.to(receiver.socketId).emit("new_chat_message", {
            chatId: chat._id,
            message: newMessage,
          });
        }
      } catch (error) {
        console.error("Error handling message:", error);
        socket.emit("message_error", { error: "Failed to send message" });
      }
    });

    // Handle typing status
    socket.on("typing_start", ({ chatId, userId }) => {
      socket.to(chatId).emit("user_typing", { chatId, userId, isTyping: true });
    });

    socket.on("typing_end", ({ chatId, userId }) => {
      socket
        .to(chatId)
        .emit("user_typing", { chatId, userId, isTyping: false });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      // Remove user from connected users
      for (const [userId, data] of connectedUsers.entries()) {
        if (data.socketId === socket.id) {
          connectedUsers.delete(userId);
          break;
        }
      }
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = setupChatSocket;
