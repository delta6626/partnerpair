import { create } from "zustand";
import type { User } from "../types/User";
import type { TempUserStore } from "../types/TempUserStore";

export const useTempUserStore = create<TempUserStore>((set) => ({
  tempUser: null,
  setTempUser: (user: User) => set({ tempUser: user }),
  resetTempUser: () => set({ tempUser: null }),
}));
