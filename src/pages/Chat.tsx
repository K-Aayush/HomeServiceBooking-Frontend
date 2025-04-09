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

  return <div>Chat</div>;
};

export default Chat;
