import { create } from "zustand";

export const useTempUserStore = create((set) => ({
  statusVisible: true,
  setStatusVisible: (visibility: boolean) => set({ statusVisible: visibility }),
}));
