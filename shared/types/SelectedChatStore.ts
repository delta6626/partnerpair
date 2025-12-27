import type { ChatExistenceInformation } from "./ChatExistenceInformation";

export interface SelectedChatStore {
  selectedChatId: ChatExistenceInformation["chatId"] | null;
  setSelectedChatId: (chatId: ChatExistenceInformation["chatId"] | null) => void;
}
