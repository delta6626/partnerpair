import { create } from "zustand";
import type { User } from "../../shared/types/User";
import type { TempUserStore } from "../../shared/types/TempUserStore";

export const useTempUserStore = create<TempUserStore>((set) => ({
  tempUser: null,
  setTempUser: (user: User) => set({ tempUser: user }),
  resetTempUser: () => set({ tempUser: null }),
}));
