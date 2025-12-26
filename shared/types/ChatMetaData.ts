import type { Timestamp } from "firebase/firestore";

export interface ChatMetaData {
  id: string;
  initiatorId: string;
  lastMessage: string;
  lastMessageAt: Timestamp | null;
  lastMessageSenderId: string;
  participants: [string, string];
  participantNames: Record<string, string>;
  participantProfileImageURLs: Record<string, string>;
  unreadCount: Record<string, number>;
}
