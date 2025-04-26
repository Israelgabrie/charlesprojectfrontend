import React, { useEffect, useState, useRef, useMemo } from "react";
import "../css/messages.css";
import { CancelXIcon } from "../SvgComponents";
import { toast } from "react-toastify";
import {
  backendLocation,
  getChats,
  getMessages,
  socket,
} from "../backendOperation";
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
  const bottomRef = useRef(null);
  const { activeUsers } = useActiveUsers();

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

      // Always update chat preview + sort later via useMemo
      setChats((prev) => {
        const updated = prev.map((chat) =>
          chat.chatId === data.chatId
            ? {
                ...chat,
                lastMessage: data.messageData.content,
                time: new Date().toISOString(),
              }
            : chat
        );

        const exists = updated.some((c) => c.chatId === data.chatId);
        if (!exists) {
          updated.push({
            chatId: data.chatId,
            fullName: "Unknown", // fallback if new
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
        const response = await getMessages({ chatId ,userId:user.id});
        if (response.success) {
          console.log(response)
          setMessages(response.messages);
          const chatInfo = chats.find((c) => c.chatId === chatId);
          if (chatInfo) {
            setCurrentChat(chatInfo);
          }
        } else {
          navigate("/homepage/messages")
          toast.error(response.error || response.message || "Failed To Load Messages")
        }
      }
    }

    getCurrentChatMessages();
  }, [chatId, chats]);

  async function sendMessage() {
    if (!messageText.trim()) return;

    socket.emit(
      "addMessage",
      { type: "text", value: messageText, userId: user.id, chatId },
      (data) => {
        if (data.success) {
          setMessageText("");
        }
      }
    );
  }

  const sortedAndFilteredChats = useMemo(() => {
    return [...chats]
      .filter((chat) =>
        chat.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => new Date(b.time) - new Date(a.time)); // newest at top
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

  useEffect(() => {
    console.log("message active users");
    console.log(activeUsers);
    console.log(currentChat.chatId)
    // if(activeUsers.includes(currentChat.chatId)){
    //   console.log("yipee")
    // }else{
    //   console.log("ypoooo")
    // }
  }, [activeUsers,currentChat.chatId]);

  return (
    <div className="messagesContainer">
      {/* Left Panel */}
      <div className="friendsListPanel">
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
              onClick={() => {
                navigate(`/homepage/messages/${chat.chatId}`);
                setCurrentChat(chat);
              }}
            >
              <div
                className="friendAvatar"
                style={{
                  backgroundImage: `url(${backendLocation}${chat.profileImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {activeUsers?.includes(chat.chatId) ? (
                  <div
                    className="activeBox"
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: "green",
                      borderRadius: "50%",
                      position: "relative",
                      marginTop: "80%",
                      marginLeft: "auto",
                    }}
                  ></div>
                ) : null}
              </div>
              <div className="friendInfo">
                <div className="friendName">{chat.fullName}</div>
                <div className="lastMessage">{chat.lastMessage}</div>
              </div>
              <div className="messageTime">{getRelativeTime(chat.time)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="chatPanel" style={{ display: chatId ? "flex" : "none" }}>
        <div className="chatHeader">
          <div className="chatHeaderLeft">
            <div
              className="friendAvatar"
              style={{
                backgroundImage: `url(${backendLocation}${currentChat?.profileImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="friendInfo">
              <div className="friendName">{currentChat.fullName}</div>
              <div className="onlineStatus">{activeUsers?.includes(currentChat.chatId) ? "Online" : null}</div>
            </div>
          </div>
          <div className="chatHeaderRight">
            <div
              className="headerIcon"
              onClick={() => navigate("/homepage/messages")}
            >
              <CancelXIcon />
            </div>
          </div>
        </div>

        <div className="messageThread">
          <div className="dateMarker">
            <span>Today</span>
          </div>

          {messages.map((message) => (
            <div
              key={message._id}
              className={`messageItem ${
                message.sender._id?.toString() === user.id?.toString()
                  ? "user"
                  : "friend"
              }`}
            >
              {message.sender._id?.toString() === user.id?.toString() ? null : (
                <div
                  className="messageAvatar"
                  style={{
                    backgroundImage: `url(${backendLocation}${currentChat?.profileImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              )}
              <div className="messageContent">
                <div className="messageBubble">{message.content}</div>
                <div
                  className="messageTime"
                  style={{
                    marginRight:
                      message.sender._id?.toString() === user.id?.toString()
                        ? ""
                        : "auto",
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
          <div className="attachmentIcons">
            <div className="attachmentIcon">📎</div>
            <div className="attachmentIcon">😊</div>
          </div>
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
