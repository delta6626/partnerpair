import type { Timestamp } from "firebase/firestore";

export interface ChatMessage {
  senderId: string;
  content: string;
  sentAt: Timestamp;
}
