import type { Timestamp } from "firebase/firestore";
import type { ChatMessage } from "./ChatMessage";

export interface AbuseReport {
  reportedUserId: ChatMessage["id"];
  reporterId: string;
  reportedMessageId: ChatMessage["id"];
  reportedMessage: ChatMessage["content"];
  reportReason: string;
  reportCreatedAt: Timestamp;
}
