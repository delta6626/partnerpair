import type { User } from "./User";

export type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
};
