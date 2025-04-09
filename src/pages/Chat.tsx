import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { io, type Socket } from "socket.io-client";
import ChatSidebar from "../components/chats/ChatSidebar";
import ChatWindow from "../components/chats/ChatWindow";
import { toast } from "sonner";

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

  const isUser = !!userData;
  const isRequiter = !!requiterData;
  const currentId = isUser ? userData.id : requiterData?.id;

  useEffect(() => {
    if (!userToken) return;

    const socketUrl =
      backendUrl || import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
    console.log("Attempting to connect to:", socketUrl);

    const newSocket = io(socketUrl, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("Connected to socket server:", newSocket.id);
      newSocket.emit("authenticate", {
        token: userToken,
        type: isUser ? "user" : "requiter",
      });
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
  }, [backendUrl, userToken, isUser, isRequiter, selectedConversation]);

  useEffect(() => {
    if (!userToken) return;

    const fetchConversations = async () => {
      try {
        setLoading(true);
        const endpoint = isUser
          ? `${backendUrl}/api/chat/user/conversations`
          : `${backendUrl}/api/chat/requiter/conversations`;
        const token = isUser ? userToken : requiterToken;

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

    fetchConversations();
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
        const { data } = await axios.get(
          `${backendUrl}/api/chat/conversation/${selectedConversation}/messages`
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
  }, [backendUrl, selectedConversation]);

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

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatSidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        isUser={isUser}
        loading={loading}
      />
      {selectedConversation ? (
        <ChatWindow
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          isUser={isUser}
          currentId={currentId}
          loading={loading}
        />
      ) : (
        <div className="flex items-center justify-center flex-1 p-4">
          <p className="text-gray-500">
            Select a conversation to start chatting
          </p>
        </div>
      )}
    </div>
  );
};

export default Chat;
