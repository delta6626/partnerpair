import { create } from "zustand";
import type { User } from "../../shared/types/User";
import type { UserStore } from "../../shared/types/UserStore";

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  resetUser: () => set({ user: null }),
}));
