import { Skeleton } from "../ui/skeleton";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface Conversation {
  id: string;
  user?: {
    name: string;
    userProfileImage: string;
  };
  requiter?: {
    name: string;
    requiterProfileImage: string;
  };
  messages: any[];
}

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedConversation: string | null;
  setSelectedConversation: (id: string) => void;
  isUser: boolean;
  loading: boolean;
  isMobile?: boolean;
}

const ChatSidebar = ({
  conversations,
  selectedConversation,
  setSelectedConversation,
  isUser,
  loading,
  isMobile = false,
}: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredConversations = searchQuery
    ? conversations.filter((conversation) => {
        const name = isUser
          ? conversation.requiter?.name
          : conversation.user?.name;
        return name?.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : conversations;

  if (loading) {
    return (
      <div className="flex flex-col w-full h-full bg-white border-r border-gray-200">
        <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-600">
          <h2 className="text-xl font-bold text-white">Conversations</h2>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 mb-3 p-3 ${
                isMobile ? "p-4" : "p-3"
              } bg-gray-50 rounded-lg`}
            >
              <Skeleton
                className={`${
                  isMobile ? "w-14 h-14" : "w-10 h-10"
                } rounded-full`}
              />
              <div className="flex-1">
                <Skeleton className="w-3/4 h-4 mb-2" />
                <Skeleton className="w-1/2 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="sticky top-0 z-10 p-4 bg-gradient-to-r from-purple-500 to-indigo-600">
        {showSearch ? (
          <div className="flex items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full p-2 pr-10 text-white border-none rounded-full pl-9 bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                autoFocus
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/70" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-white/70"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowSearch(false)}
              className="ml-3 font-medium text-white"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Conversations</h2>
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 text-white rounded-full hover:bg-white/10"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Conversations List */}
      <div className="flex-1 p-3 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <div className="p-6 text-center rounded-lg shadow-sm bg-gray-50">
              <p className="text-lg text-gray-500">
                {searchQuery
                  ? "No conversations found"
                  : "No conversations yet"}
              </p>
              {searchQuery && (
                <p className="mt-2 text-sm text-gray-400">
                  Try a different search term
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredConversations.map((conversation) => {
              const name = isUser
                ? conversation.requiter?.name
                : conversation.user?.name;
              const image = isUser
                ? conversation.requiter?.requiterProfileImage
                : conversation.user?.userProfileImage;
              const lastMessage =
                conversation.messages[0]?.content || "No messages yet";

              return (
                <div
                  key={conversation.id}
                  className={`flex items-center gap-3 ${
                    isMobile ? "p-4 mb-3" : "p-3 mb-2"
                  } rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedConversation === conversation.id
                      ? "bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 shadow-md"
                      : "hover:bg-gray-50 border-l-4 border-transparent"
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="relative">
                    {image ? (
                      <img
                        src={image || "/placeholder.svg"}
                        alt={name || "User"}
                        className={`object-cover ${
                          isMobile ? "w-14 h-14" : "w-12 h-12"
                        } rounded-full border-2 border-white shadow-sm`}
                      />
                    ) : (
                      <div
                        className={`flex items-center justify-center ${
                          isMobile ? "w-14 h-14 text-xl" : "w-12 h-12 text-lg"
                        } font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 shadow-sm`}
                      >
                        {name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    <span
                      className={`absolute bottom-0 right-0 ${
                        isMobile ? "w-4 h-4" : "w-3 h-3"
                      } bg-green-500 border-2 border-white rounded-full`}
                    ></span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3
                      className={`font-medium ${
                        isMobile ? "text-lg" : "text-base"
                      } truncate ${
                        selectedConversation === conversation.id
                          ? "text-purple-700"
                          : "text-gray-800"
                      }`}
                    >
                      {name || "Unknown User"}
                    </h3>
                    <p className="text-gray-500 truncate">{lastMessage}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
