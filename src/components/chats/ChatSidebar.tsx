import { Skeleton } from "../ui/skeleton";

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
}

const ChatSidebar = ({
  conversations,
  selectedConversation,
  setSelectedConversation,
  isUser,
  loading,
}: ChatSidebarProps) => {
  if (loading) {
    return (
      <div className="w-1/4 min-w-[250px] border-r border-gray-200 bg-white p-4">
        <h2 className="mb-4 text-xl font-bold">Conversations</h2>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3 mb-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <Skeleton className="w-3/4 h-4 mb-2" />
              <Skeleton className="w-1/2 h-3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-1/4 min-w-[250px] border-r border-gray-200 bg-white p-4 overflow-y-auto">
      <h2 className="mb-4 text-xl font-bold">Conversations</h2>

      {conversations.length === 0 ? (
        <p className="text-gray-500">No conversations yet</p>
      ) : (
        conversations.map((conversation) => {
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
              className={`flex items-center gap-3 p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                selectedConversation === conversation.id ? "bg-gray-100" : ""
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="relative">
                {image ? (
                  <img
                    src={image || "/placeholder.svg"}
                    alt={name}
                    className="object-cover w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-primary">
                    {name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-medium truncate">{name}</h3>
                <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatSidebar;
