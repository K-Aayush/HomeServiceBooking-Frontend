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
  user?: {
    id: string;
    name: string;
    userProfileImage: string;
  };
  requiter?: {
    id: string;
    name: string;
    requiterProfileImage: string;
  };
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

  // Initialize socket connection
  useEffect(() => {
    if (!userToken) return;

    const newSocket = io(backendUrl, {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      // Authenticate with the socket server
      newSocket.emit("authenticate", {
        token: userToken,
        type: isUser ? "user" : "requiter",
      });
    });

    newSocket.on("authenticated", () => {
      console.log("Socket authenticated");
    });

    newSocket.on("auth_error", (error) => {
      console.error("Authentication error:", error);
      toast.error("Failed to connect to chat server");
    });

    newSocket.on("new_message", (message: Message) => {
      if (message.conversationId === selectedConversation) {
        setMessages((prev) => [...prev, message]);

        newSocket.emit("mark_as_read", { messageIds: [message.id] });
      } else {
        toast.info("New message received in another conversation");
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [backendUrl, userToken, isUser, isRequiter, selectedConversation]);

  // Fetch conversations
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
          headers: {
            Authorization: token,
          },
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

  // Fetch messages when conversation is selected
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

  // Handle sending a message
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
      {/* Chat Sidebar */}
      <ChatSidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        isUser={isUser}
        loading={loading}
      />

      {/* Chat Window */}
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
