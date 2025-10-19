import type { User } from "../types/User";

export type TempUserStore = {
  tempUser: User | null;
  setTempUser: (user: User) => void;
  resetTempUser: () => void;
};
