import { create } from "zustand";
import type { User } from "../types/User";
import type { UserStore } from "../types/UserStore";

export const useTempUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user: User) => set({ user }),

  resetUser: () => set({ user: null }),
}));
