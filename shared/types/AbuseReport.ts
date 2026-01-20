import type { Timestamp } from "firebase/firestore";
import type { ChatMessage } from "./ChatMessage";

export interface AbuseReport {
  reportedUserId: ChatMessage["id"];
  reportedId: string;
  reportedMessage: ChatMessage["content"];
  reportReason: string;
  reportCreatedAt: Timestamp;
}
