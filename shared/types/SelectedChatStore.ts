import type { ChatExistenceInformation } from "./ChatExistenceInformation";

export interface SelectedChatStore {
  selectedChatId: Pick<ChatExistenceInformation, "chatId"> | null;
  setSelectedChatId: (chatId: Pick<ChatExistenceInformation, "chatId"> | null) => void;
}
