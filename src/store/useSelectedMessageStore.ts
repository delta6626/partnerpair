import { create } from "zustand";
import type { SelectedMessageStore } from "../../shared/types/SelectedMessageStore";
import type { ChatMessage } from "../../shared/types/ChatMessage";

export const useSelectedMessageStore = create<SelectedMessageStore>((set) => ({
  selectedMessage: null,
  setSelectedMessage: (message: ChatMessage | null) => set({ selectedMessage: message }),
}));
