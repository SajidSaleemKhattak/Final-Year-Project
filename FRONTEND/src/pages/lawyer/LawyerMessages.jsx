import React, { useState, useEffect, useRef } from "react";
import logo from "./../../assets/home/logo.png";
import gear from "./../../assets/Client/Gear.png";
import Vector from "./../../assets/Client/Vector.png";
import pfp from "./../../assets/Client/pfp.png";
import LSideBar from "./components/L-sidebar.jsx";
import { FaPaperPlane } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

const LawyerMessages = () => {
  const [showNotification, setshowNotification] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);

  const lawyer = JSON.parse(localStorage.getItem("lawyer"));
  const lawyerId = lawyer._id.toString();

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(SOCKET_URL);

    // Connect lawyer to socket
    socketRef.current.emit("user_connected", {
      userId: lawyerId,
      userType: "Lawyer",
    });

    // Load all chats for the lawyer
    const loadChats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/chat/lawyer/${lawyerId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setChats(response.data);
      } catch (error) {
        console.error("Error loading chats:", error);
      }
    };

    loadChats();

    // Socket event listeners
    const handleReceiveMessage = (data) => {
      if (selectedChat && data.chatId === selectedChat._id) {
        setMessages((prev) => {
          // Check if message already exists
          const messageExists = prev.some(
            (msg) =>
              msg.senderId === data.senderId && msg.message === data.message
          );
          if (messageExists) return prev;
          return [...prev, data];
        });
      }
      // Refresh chat list when new message arrives
      loadChats();
    };

    const handleNewChatMessage = () => {
      loadChats();
    };

    const handleTyping = ({ chatId, userId, isTyping }) => {
      if (selectedChat && chatId === selectedChat._id && userId !== lawyerId) {
        setIsTyping(isTyping);
      }
    };

    socketRef.current.on("receive_message", handleReceiveMessage);
    socketRef.current.on("new_chat_message", handleNewChatMessage);
    socketRef.current.on("user_typing", handleTyping);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("receive_message", handleReceiveMessage);
        socketRef.current.off("new_chat_message", handleNewChatMessage);
        socketRef.current.off("user_typing", handleTyping);
        socketRef.current.disconnect();
      }
    };
  }, [lawyerId, selectedChat]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatSelect = async (chat) => {
    setSelectedChat(chat);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/chat/history/${chat.participants.find(
          (p) => p !== lawyerId
        )}/${lawyerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessages(response.data.messages);

      // Join the chat room
      socketRef.current.emit("join_chat", chat._id);
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };

  const handleTyping = () => {
    if (selectedChat) {
      socketRef.current.emit("typing_start", {
        chatId: selectedChat._id,
        userId: lawyerId,
      });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current.emit("typing_end", {
          chatId: selectedChat._id,
          userId: lawyerId,
        });
      }, 1000);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      const messageData = {
        chatId: selectedChat._id,
        senderId: lawyerId,
        senderType: "Lawyer",
        receiverId: selectedChat.participants.find((p) => p !== lawyerId),
        receiverType: "User",
        message: newMessage,
        timestamp: new Date(),
      };

      try {
        // Clear input and typing status immediately
        setNewMessage("");
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
          socketRef.current.emit("typing_end", {
            chatId: selectedChat._id,
            userId: lawyerId,
          });
        }

        // Only emit through socket, don't add to state manually
        socketRef.current.emit("send_message", messageData);

        // Persist to database
        await axios.post(
          `http://localhost:5000/api/chat/message`,
          messageData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again.");
      }
    }
  };

  const handleNotification = () => {
    setshowNotification((toggle) => !toggle);
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage?.message
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between mx-20 mt-6">
        <img src={logo} alt="" className="w-[219px] h-[57px]" />
        <div className="flex justify-between relative gap-4 items-center">
          <Link to="/lawyersettings">
            <img
              src={gear}
              className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
              alt="Settings"
            />
          </Link>
          <div className="flex justify-between gap-1.5">
            <img src={pfp} className="w-7 h-7 rounded-4xl" alt="" />
            <p className="text-neutral-600 font-semibold">{lawyer.name}</p>
          </div>
        </div>
      </div>

      <hr className="border-1 border-gray-200 mt-3" />

      {/* MAIN BODY */}
      <div className="flex flex-grow overflow-hidden">
        <LSideBar active="messages" />

        {/* MAIN CONTENT */}
        <div className="w-full flex px-6 py-4 gap-6">
          {/* LEFT - MESSAGES LIST */}
          <div className="w-2/5 flex flex-col">
            <p className="text-2xl font-semibold mb-6">Messages</p>
            <input
              type="text"
              className="border border-neutral-200 rounded-xl w-5/6 px-4 py-2 shadow"
              placeholder="Search For Messages"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="mt-8 flex flex-col gap-4 overflow-auto">
              {filteredChats.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => handleChatSelect(chat)}
                  className={`flex justify-between items-center w-3/4 cursor-pointer ${
                    selectedChat?._id === chat._id ? "bg-gray-100" : ""
                  } rounded-lg p-2`}
                >
                  <img
                    className="w-12 h-12 rounded-full object-center"
                    src={chat.userImage || pfp}
                    alt={chat.userName}
                  />
                  <div className="w-full pl-4">
                    <p className="font-semibold">{chat.userName}</p>
                    <p className="text-sm text-neutral-500">
                      {chat.lastMessage?.message || "No messages yet"}
                    </p>
                  </div>
                  {chat.lastMessage && (
                    <p className="text-neutral-500 text-sm">
                      {new Date(chat.lastMessage.timestamp).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - CHAT WINDOW */}
          <div className="w-3/5 flex flex-col justify-between border border-gray-300 rounded-xl overflow-hidden">
            {selectedChat ? (
              <>
                {/* HEADER of chat */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <img
                      className="w-12 h-12 rounded-full object-center"
                      src={selectedChat.userImage || pfp}
                      alt="Profile"
                    />
                    <div className="ml-4">
                      <p className="font-semibold">{selectedChat.userName}</p>
                      <p className="text-sm text-neutral-500">
                        {selectedChat.userType}
                      </p>
                    </div>
                  </div>
                  <IoCallOutline className="text-xl" />
                </div>

                {/* Message area */}
                <div className="flex-grow px-4 py-2 overflow-auto">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.senderId === lawyerId
                          ? "justify-end"
                          : "justify-start"
                      } mb-4`}
                    >
                      <div
                        className={`max-w-[70%] rounded-xl p-3 ${
                          message.senderId === lawyerId
                            ? "bg-[#62B9CB] text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        <p>{message.message}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="text-sm text-neutral-500 italic">
                      User is typing...
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex items-center gap-3 p-4 border-t border-gray-200">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      handleTyping();
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage(e);
                      }
                    }}
                    className="border border-neutral-300 rounded px-4 py-2 w-full"
                    placeholder="Type your message"
                  />
                  <div className="bg-[#62B9CB] py-2 rounded-sm flex px-2">
                    <input type="file" className="cursor-pointer" />
                  </div>
                  <FaPaperPlane
                    onClick={handleSendMessage}
                    className="text-[#62B9CB] text-2xl cursor-pointer"
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-neutral-500">
                Select a chat to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerMessages;
