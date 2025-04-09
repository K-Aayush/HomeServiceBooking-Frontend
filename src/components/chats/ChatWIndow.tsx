import React from "react";
import { useEffect, useRef } from "react";
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

  loading: boolean;
}

const ChatWindow = ({
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  isUser,

  loading,
}: ChatWindowProps) => {
  // Reference to the messages container for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      <div className="flex flex-col flex-1 h-full bg-white">
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

  return (
    <div className="flex flex-col flex-1 h-full bg-white">
      {/* Chat Header */}
      <div className="p-4 bg-gray-100 border-b border-gray-200">
        <h2 className="mb-3 text-xl font-semibold">Messages</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="p-6 text-gray-500 bg-white rounded-lg shadow-md">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isCurrentUser =
                (isUser && message.senderType === "USER") ||
                (!isUser && message.senderType === "REQUITER");

              const isSystemMessage = message.senderId === "system";

              if (isSystemMessage) {
                return (
                  <div key={message.id} className="flex justify-center mb-4">
                    <div className="bg-gray-100 text-gray-600 p-2 rounded-lg text-sm max-w-[80%] text-center shadow-sm">
                      {message.content}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg shadow-md ${
                      isCurrentUser
                        ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-tr-none"
                        : "bg-white rounded-tl-none border border-gray-200"
                    }`}
                  >
                    <p className="leading-relaxed">{message.content}</p>
                    <p
                      className={`text-xs mt-1 text-right ${
                        isCurrentUser ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {formatTime(message.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2 p-2 rounded-full shadow-sm bg-gray-50">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 p-2 bg-transparent border-none focus:outline-none focus:ring-0"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
