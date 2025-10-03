import type { User } from "../types/User";

export const profileComplete = (user: User) => {
  if (user.basicInfo.phone === "") return false;
  if (user.professionalInfo.headline === "") return false;
  if (user.professionalInfo.bio === "") return false;
  if (user.professionalInfo.skills.length === 0) return false;
  if (user.professionalInfo.roles.length === 0) return false;
  if (user.professionalInfo.commitmentLevel === null) return false;
  if (user.professionalInfo.availability === null) return false;
};
