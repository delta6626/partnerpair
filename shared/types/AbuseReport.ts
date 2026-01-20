import type { Timestamp } from "firebase/firestore";
import type { ChatMessage } from "./ChatMessage";

export type AbuseReport = Pick<ChatMessage, "senderId" | "content"> & {
  reportReason: string;
  reporterId: string;
  reportCreatedAt: Timestamp;
};
