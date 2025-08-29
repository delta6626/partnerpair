import type { User } from "./User";

export type TempUserStore = {
  tempUser: User | null;
  setTempUser: (tempUser: User) => void;
  resetTempUser: () => void;
};
