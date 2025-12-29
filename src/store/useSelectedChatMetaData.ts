import { create } from "zustand";

import type { ChatMetaData } from "../../shared/types/ChatMetaData";
import type { SelectedChatMetaDataStore } from "../../shared/types/SelectedChatMetaDataStore";

export const useSelectedChatMetaDataStore = create<SelectedChatMetaDataStore>((set) => ({
  selectedChatMetaData: null,
  setSelectedChatMetaData: (chatMetaData: ChatMetaData | null) => set({ selectedChatMetaData: chatMetaData }),
}));
