import type { Timestamp } from "firebase/firestore";

export interface ChatMetaData {
  id: string;
  initiatorId: string;
  createdAt: Timestamp;
  lastMessage: string;
  lastMessageAt: Timestamp | null;
  lastMessageSenderId: string;
  participants: [string, string];
  participantNames: Record<string, string>;
  participantHeadlines: Record<string, string>;
  participantProfileImageUrls: Record<string, string>;
  unreadCount: Record<string, number>;
}
