import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { io, type Socket } from "socket.io-client";
import ChatSidebar from "../components/chats/ChatSidebar";
import ChatWindow from "../components/chats/ChatWindow";
import { toast } from "sonner";

interface Conversation {
    id: string
    userId: string
    requiterId: string
    user?: {
      id: string
      name: string
      userProfileImage: string
    }
    requiter?: {
      id: string
      name: string
      requiterProfileImage: string
    }
    messages: Message[]
  }
  
  interface Message {
    id: string
    content: string
    senderId: string
    senderType: "USER" | "REQUITER"
    conversationId: string
    read: boolean
    createdAt: string
  }

const Chat = () => {
  return <div>Chat</div>;
};

export default Chat;
