import type { ChatMessage } from "./ChatMessage";

export interface SelectedMessageStore {
  selectedMessage: ChatMessage | null;
  setSelectedMessage: (message: ChatMessage | null) => void;
}
