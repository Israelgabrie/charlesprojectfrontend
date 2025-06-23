import React, { useEffect, useState, useRef, useMemo } from "react";
import "../css/messages.css";
import { CancelXIcon } from "../SvgComponents";
import { toast } from "react-toastify";
import { backendLocation, getChats, getMessages, socket } from "../backendOperation";
import { useUser } from "../userContext";
import { formatTimeFromISO, getRelativeTime } from "../helperFuntions";
import { useNavigate, useParams } from "react-router-dom";
import { useActiveUsers } from "../activeUsersContext";

export default function Messages() {
  const { user } = useUser();
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [currentChat, setCurrentChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const bottomRef = useRef(null);
  const { activeUsers } = useActiveUsers();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowChatPanel(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show chat panel when chatId changes on mobile
  useEffect(() => {
    if (chatId && isMobile) {
      setShowChatPanel(true);
    }
  }, [chatId, isMobile]);

  useEffect(() => {
    const handleNewMessage = (data) => {
      console.log("📨 New message received:", data);

      toast.info("📨 New message received:");
      if (data.chatId === chatId) {
        setMessages((prev) => [
          ...prev,
          {
            ...data.messageData,
            sender: {
              _id: data.senderId,
              fullName: data?.messageData?.sender?.fullName || "NaN",
            },
          },
        ]);
      }

      setChats((prev) => {
        const updated = prev.map((chat) =>
          chat.chatId === data.chatId
            ? {
                ...chat,
                lastMessage: data.messageData.content,
                time: new Date().toISOString(),
              }
            : chat,
        );

        const exists = updated.some((c) => c.chatId === data.chatId);
        if (!exists) {
          updated.push({
            chatId: data.chatId,
            fullName: "Unknown",
            lastMessage: data.messageData.content,
            time: new Date().toISOString(),
          });
        }

        return [...updated];
      });
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const getAllChats = async () => {
      const toastId = toast.loading("Loading Chats...");
      try {
        const response = await getChats({ userId: user.id });
        console.log(response);
        toast.update(toastId, {
          render: response.message || "Something went wrong",
          autoClose: 2000,
          isLoading: false,
          type: response.success ? "success" : "error",
        });

        if (response.success) {
          setChats(response.chats);
        }
      } catch (error) {
        toast.update(toastId, {
          render: error.message || "Error fetching chats",
          autoClose: 2000,
          isLoading: false,
          type: "error",
        });
      }
    };

    getAllChats();
  }, [user.id]);

  useEffect(() => {
    async function getCurrentChatMessages() {
      if (chatId) {
        const response = await getMessages({ chatId, userId: user.id });
        if (response.success) {
          console.log(response);
          setMessages(response.messages);
          const chatInfo = chats.find((c) => c.chatId === chatId);
          if (chatInfo) {
            setCurrentChat(chatInfo);
          }
        } else {
          navigate("/homepage/messages");
          toast.error(response.error || response.message || "Failed To Load Messages");
        }
      }
    }

    getCurrentChatMessages();
  }, [chatId, chats]);

  async function sendMessage() {
    if (!messageText.trim()) return;

    socket.emit("addMessage", { type: "text", value: messageText, userId: user.id, chatId }, (data) => {
      if (data.success) {
        setMessageText("");
      }
    });
  }

  const sortedAndFilteredChats = useMemo(() => {
    return [...chats]
      .filter((chat) => chat.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => new Date(b.time) - new Date(a.time));
  }, [chats, searchTerm]);

  useEffect(() => {
    const joinAllChatRooms = () => {
      chats.forEach((chat) => {
        socket.emit("joinRoom", user.id, chat.chatId);
      });
    };

    if (chats.length) {
      joinAllChatRooms();
    }
  }, [chats]);

  const handleChatSelect = (chat) => {
    navigate(`/homepage/messages/${chat.chatId}`);
    setCurrentChat(chat);
    if (isMobile) {
      setShowChatPanel(true);
    }
  };

  const handleBackToChats = () => {
    if (isMobile) {
      setShowChatPanel(false);
      navigate("/homepage/messages");
    } else {
      navigate("/homepage/messages");
    }
  };

  return (
    <div className="messagesContainer">
      {/* Mobile Overlay */}
      {isMobile && showChatPanel && <div className="mobileOverlay" onClick={() => setShowChatPanel(false)} />}

      {/* Left Panel - Friends List */}
      <div className={`friendsListPanel ${isMobile && showChatPanel ? "hidden" : ""}`}>
        <div className="searchContainer">
          <input
            type="text"
            className="searchInput"
            placeholder="Search friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="friendsList">
          {sortedAndFilteredChats.map((chat) => (
            <div
              key={chat.chatId}
              className={`friendItem ${chatId === chat.chatId ? "active" : ""}`}
              onClick={() => handleChatSelect(chat)}
            >
              <div
                className="friendAvatar"
                style={{
                  backgroundImage: `url(${backendLocation}${chat.profileImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="friendInfo">
                <div className="friendName">{chat.fullName}</div>
                <div className="lastMessage">{chat.lastMessage}</div>
              </div>
              <div className="messageTime">{getRelativeTime(chat.time)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Chat */}
      <div
        className={`chatPanel ${isMobile ? "mobile" : ""} ${isMobile && showChatPanel ? "show" : ""}`}
        style={{ display: chatId ? "flex" : "none" }}
      >
        <div className="chatHeader">
          <div className="chatHeaderLeft">
            {isMobile && (
              <button className="backButton" onClick={handleBackToChats}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
            <div
              className="friendAvatar"
              style={{
                backgroundImage: `url(${backendLocation}${currentChat?.profileImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="friendInfo">
              <div className="friendName">{currentChat.fullName}</div>
              {/* <div className="onlineStatus">{activeUsers.includes(currentChat.chatId) ? "Online" : "Offline"}</div> */}
            </div>
          </div>
          <div className="chatHeaderRight">
            {!isMobile && (
              <div className="headerIcon" onClick={handleBackToChats}>
                <CancelXIcon />
              </div>
            )}
          </div>
        </div>

        <div className="messageThread">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`messageItem ${message.sender._id?.toString() === user.id?.toString() ? "user" : "friend"}`}
            >
              {message.sender._id?.toString() === user.id?.toString() ? null : (
                <div
                  className="messageAvatar"
                  style={{
                    backgroundImage: `url(${backendLocation}${currentChat?.profileImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              )}
              <div className="messageContent">
                <div className="messageBubble">{message.content}</div>
                <div
                  className="messageTime"
                  style={{
                    marginRight: message.sender._id?.toString() === user.id?.toString() ? "" : "auto",
                  }}
                >
                  {formatTimeFromISO(message.createdAt)}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>

        <form
          className="messageInputContainer"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          {/* <div className="attachmentIcons">
            <div className="attachmentIcon">📎</div>
            <div className="attachmentIcon">😊</div>
          </div> */}
          <input
            type="text"
            className="messageInput"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button className="sendButton" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
