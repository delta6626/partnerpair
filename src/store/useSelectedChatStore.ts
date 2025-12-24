import { create } from "zustand";
import type { SelectedChatStore } from "../../shared/types/SelectedChatStore";

export const useSelectedChatStore = create<SelectedChatStore>((set) => ({
  selectedChatId: null,
  setSelectedChatId: (chatId) => set({ selectedChatId: chatId }),
}));
