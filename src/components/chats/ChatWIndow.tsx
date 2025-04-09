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

  if (loading) {
    return (
      <div className="flex flex-col flex-1 bg-white">
        <div className="p-4 border-b border-gray-200">
          <Skeleton className="w-1/4 h-6" />
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`flex mb-4 ${index % 2 === 0 ? "justify-end" : ""}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  index % 2 === 0 ? "bg-primary text-white" : "bg-gray-100"
                }`}
              >
                <Skeleton
                  className={`h-4 w-full ${
                    index % 2 === 0 ? "bg-white/20" : ""
                  }`}
                />
                <Skeleton
                  className={`h-4 w-2/3 mt-2 ${
                    index % 2 === 0 ? "bg-white/20" : ""
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <Skeleton className="w-full h-10" />
        </div>
      </div>
    );
  }

  return <div>ChatWIndow</div>;
};

export default ChatWindow;
