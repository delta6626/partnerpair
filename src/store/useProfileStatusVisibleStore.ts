import { create } from "zustand";

export const useProfileStatusVisibleStore = create((set) => ({
  statusVisible: true,
  setStatusVisible: (visibility: boolean) => set({ statusVisible: visibility }),
}));
