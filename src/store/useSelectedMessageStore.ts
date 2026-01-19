import { create } from "zustand";
import type { SelectedMessageStore } from "../../shared/types/SelectedMessageStore";
import type { ReportedMessage } from "../../shared/types/ReportedMessage";

export const useSelectedMessageStore = create<SelectedMessageStore>((set) => ({
  selectedMessage: null,
  setSelectedMessage: (message: ReportedMessage | null) => set({ selectedMessage: message }),
}));
