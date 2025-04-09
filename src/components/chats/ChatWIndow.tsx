import type React from "react";

import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderType: "USER" | "REQUITER";
  createdAt: string;
}

interface ChatWindowProps {
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  isUser: boolean;
  currentId: string;
  loading: boolean;
}

const ChatWindow = ({
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  isUser,
  currentId,
  loading,
}: ChatWindowProps) => {
  // Function to format timestamp
  const formatTime = (timestamp: string) => {
    return format(new Date(timestamp), "h:mm a");
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return <div>ChatWIndow</div>;
};

export default ChatWindow;
