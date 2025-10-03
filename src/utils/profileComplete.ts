import type { User } from "../types/User";

export const profileComplete = (user: User) => {
  if (user.basicInfo.phone === "") return false;
  if (user.professionalInfo.headline === "") return false;
  if (user.professionalInfo.bio === "") return false;
};
