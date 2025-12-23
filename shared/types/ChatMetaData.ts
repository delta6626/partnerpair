import type { Timestamp } from "firebase/firestore";

export interface ChatMetaData {
  id: string;
  lastMessage: string;
  lastMessageAt: Timestamp;
  lastMessageSenderId: string;
  participants: [string, string];
  unreadCount: {
    userA: number;
    userB: number;
  };
}
