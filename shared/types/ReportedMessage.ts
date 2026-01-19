import type { ChatMessage } from "./ChatMessage";

export type ReportedMessage = ChatMessage & {
  reporterId: string;
};
