import type { ChatMetaData } from "./ChatMetaData";

export interface SelectedChatMetaDataStore {
  selectedChatMetaData: ChatMetaData | null;
  setSelectedChatMetaData: (chatMetaData: ChatMetaData | null) => void;
}
