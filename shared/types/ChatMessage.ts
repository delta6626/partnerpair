import type { Timestamp } from "firebase/firestore";

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  sentAt: Timestamp;
}
