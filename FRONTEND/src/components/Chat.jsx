import React, { useState, useEffect, useRef } from "react";
import pfp from "../assets/Client/pfp.png";
import io from "socket.io-client";
import axios from "axios";

const SOCKET_URL = "http://localhost:5000";

const Chat = ({ lawyer, user, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setChatId] = useState(null);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(SOCKET_URL);

    // Connect user to socket
    socketRef.current.emit("user_connected", {
      userId: user._id,
      userType: "User",
    });

    // Load chat history
    const loadChatHistory = async () => {
      try {
        const response = await axios.get(
          `/api/chat/history/${user._id}/${lawyer._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMessages(response.data);
        if (response.data.length > 0) {
          setChatId(response.data[0].chatId);
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    };

    loadChatHistory();

    // Socket event listeners
    socketRef.current.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data.message]);
    });

    socketRef.current.on("user_typing", ({ userId, isTyping }) => {
      if (userId === lawyer._id) {
        setIsTyping(isTyping);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [user._id, lawyer._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTyping = () => {
    socketRef.current.emit("typing_start", { chatId, userId: user._id });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("typing_end", { chatId, userId: user._id });
    }, 1000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageData = {
        chatId,
        senderId: user._id,
        senderType: "User",
        receiverId: lawyer._id,
        receiverType: "Lawyer",
        message: newMessage,
      };

      try {
        socketRef.current.emit("send_message", messageData);
        setNewMessage("");

        // Clear typing timeout
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
          socketRef.current.emit("typing_end", { chatId, userId: user._id });
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-[380px] h-[500px] bg-white rounded-2xl shadow-lg flex flex-col border-1 border-neutral-200">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b-1 border-neutral-200">
        <div className="flex items-center gap-3">
          <img
            src={lawyer.img || pfp}
            alt={lawyer.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-lg">{lawyer.name}</h3>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-neutral-500 hover:text-neutral-700"
        >
          ✕
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.senderId === user._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-2xl p-3 ${
                message.senderId === user._id
                  ? "bg-blue-400 text-white"
                  : "bg-neutral-100"
              }`}
            >
              <p className="text-sm">{message.message}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="text-sm text-neutral-500 italic">
            {lawyer.name} is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t-1 border-neutral-200"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            placeholder="Type your message..."
            className="flex-1 border-1 border-neutral-200 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-400 text-white px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
