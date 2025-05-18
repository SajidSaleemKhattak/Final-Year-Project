const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "senderType",
  },
  senderType: {
    type: String,
    required: true,
    enum: ["User", "Lawyer"],
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "receiverType",
  },
  receiverType: {
    type: String,
    required: true,
    enum: ["User", "Lawyer"],
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [messageSchema],
    lastMessage: messageSchema,
  },
  { timestamps: true }
);

// Indexes for better query performance
chatSchema.index({ "participants.userId": 1 });
chatSchema.index({ updatedAt: -1 });

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
