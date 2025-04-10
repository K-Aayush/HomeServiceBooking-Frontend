import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { io, type Socket } from "socket.io-client";
import ChatSidebar from "../components/chats/ChatSidebar";
import ChatWindow from "../components/chats/ChatWindow";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

interface Conversation {
  id: string;
  userId: string;
  requiterId: string;
  user?: { id: string; name: string; userProfileImage: string };
  requiter?: { id: string; name: string; requiterProfileImage: string };
  messages: Message[];
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderType: "USER" | "REQUITER";
  conversationId: string;
  read: boolean;
  createdAt: string;
}

const Chat = () => {
  const { backendUrl, userToken, userData, requiterData, requiterToken } =
    useContext(AppContext);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showMessageView, setShowMessageView] = useState(false);

  const isUser = !!userData;
  const isRequiter = !!requiterData;
  const currentId = isUser ? userData?.id : requiterData?.id;

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    // Initial check
    checkMobileView();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobileView);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  useEffect(() => {
    const socketUrl = backendUrl || import.meta.env.VITE_BACKEND_URL;
    console.log("Attempting to connect to:", socketUrl);

    const newSocket = io(socketUrl, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("Connected to socket server:", newSocket.id);
      const token = isUser ? userToken : requiterToken;
      if (token) {
        newSocket.emit("authenticate", {
          token,
          type: isUser ? "user" : "requiter",
        });
      } else {
        console.warn("No token available for authentication");
      }
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection failed:", error.message, error);
      toast.error(`Connection failed: ${error.message}`);
    });

    newSocket.on("authenticated", () => {
      console.log("Socket authenticated");
    });

    newSocket.on("auth_error", (error) => {
      console.error("Authentication error:", error);
      toast.error(`Authentication failed: ${error.message}`);
    });

    newSocket.on("new_message", (message: Message) => {
      if (message.conversationId === selectedConversation) {
        setMessages((prev) => [...prev, message]);
        newSocket.emit("mark_as_read", { messageIds: [message.id] });
      } else {
        toast.info("New message in another conversation");
      }
    });

    newSocket.on("message_sent", (message: Message) => {
      if (message.conversationId === selectedConversation) {
        setMessages((prev) => [...prev, message]);
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [
    backendUrl,
    userToken,
    isUser,
    isRequiter,
    requiterToken,
    selectedConversation,
  ]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const endpoint = isUser
          ? `${backendUrl}/api/chat/user/conversations`
          : `${backendUrl}/api/chat/requiter/conversations`;
        const token = isUser ? userToken : requiterToken;

        if (!token) {
          console.warn("No token available for fetching conversations");
          setLoading(false);
          return;
        }

        const { data } = await axios.get(endpoint, {
          headers: { Authorization: token },
        });

        if (data.success) {
          setConversations(data.conversations);
          if (data.conversations.length > 0 && !selectedConversation) {
            setSelectedConversation(data.conversations[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
        toast.error("Failed to load conversations");
      } finally {
        setLoading(false);
      }
    };

    if (userToken || requiterToken) {
      fetchConversations();
    }
  }, [
    backendUrl,
    userToken,
    isUser,
    isRequiter,
    requiterToken,
    selectedConversation,
  ]);

  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const token = isUser ? userToken : requiterToken;

        if (!token) {
          console.warn("No token available for fetching messages");
          setLoading(false);
          return;
        }

        const { data } = await axios.get(
          `${backendUrl}/api/chat/conversation/${selectedConversation}/messages`,
          {
            headers: { Authorization: token },
          }
        );

        if (data.success) {
          setMessages(data.messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [backendUrl, selectedConversation, isUser, userToken, requiterToken]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation || !socket) return;

    const conversation = conversations.find(
      (c) => c.id === selectedConversation
    );
    if (!conversation) return;

    const receiverId = isUser ? conversation.requiterId : conversation.userId;

    const messageData = {
      conversationId: selectedConversation,
      content: newMessage,
      senderId: currentId,
      senderType: isUser ? "USER" : "REQUITER",
      receiverId,
    };

    socket.emit("send_message", messageData);
    setNewMessage("");
  };

  const handleConversationSelect = (id: string) => {
    setSelectedConversation(id);
    if (isMobileView) {
      setShowMessageView(true);
    }
  };

  const handleBackToList = () => {
    setShowMessageView(false);
  };

  // For mobile view, we'll use a simpler layout where the sidebar and chat window
  // are stacked on top of each other rather than side by side
  if (isMobileView) {
    return (
      <div className="flex flex-col h-screen bg-gray-100">
        {showMessageView ? (
          // Show message view
          <div className="flex flex-col h-full">
            <div className="flex items-center p-4 text-white bg-gradient-to-r from-purple-500 to-indigo-600">
              <button
                onClick={handleBackToList}
                className="flex items-center text-white hover:text-white/80"
              >
                <ArrowLeft size={20} className="mr-2" />
                <span>Back</span>
              </button>
              <div className="ml-4">
                {conversations.find((c) => c.id === selectedConversation) && (
                  <h2 className="font-semibold">
                    {isUser
                      ? conversations.find((c) => c.id === selectedConversation)
                          ?.requiter?.name
                      : conversations.find((c) => c.id === selectedConversation)
                          ?.user?.name}
                  </h2>
                )}
              </div>
            </div>
            <div className="flex-1">
              <ChatWindow
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
                isUser={isUser}
                loading={loading}
              />
            </div>
          </div>
        ) : (
          // Show conversation list
          <div className="h-full">
            <ChatSidebar
              conversations={conversations}
              selectedConversation={selectedConversation}
              setSelectedConversation={handleConversationSelect}
              isUser={isUser}
              loading={loading}
              isMobile={true}
            />
          </div>
        )}
      </div>
    );
  }

  // Desktop view with side-by-side layout
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="w-1/4 min-w-[300px] h-full">
        <ChatSidebar
          conversations={conversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={handleConversationSelect}
          isUser={isUser}
          loading={loading}
          isMobile={false}
        />
      </div>

      <div className="flex-1 h-full">
        {selectedConversation ? (
          <ChatWindow
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            isUser={isUser}
            loading={loading}
          />
        ) : (
          <div className="flex items-center justify-center flex-1 h-full p-4">
            <p className="p-6 text-gray-500 bg-white rounded-lg shadow-md">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
