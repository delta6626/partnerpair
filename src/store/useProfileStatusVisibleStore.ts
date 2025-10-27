import { create } from "zustand";
import type { ProfileStatusVisibleState } from "../../shared/types/ProfileStatusVisibleStore";

export const useProfileStatusVisibleStore = create<ProfileStatusVisibleState>((set) => ({
  statusVisible: true,
  setStatusVisible: (visibility: boolean) => set({ statusVisible: visibility }),
}));
