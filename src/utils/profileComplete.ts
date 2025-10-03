import type { User } from "../types/User";

export const profileComplete = (user: User) => {
  if (user.basicInfo.phone === "") return false;
  if (user.professionalInfo.headline === "") return false;
  if (user.professionalInfo.bio === "") return false;
  if (user.professionalInfo.skills.length === 0) return false;
  if (user.professionalInfo.roles.length === 0) return false;
  if (user.professionalInfo.commitmentLevel === null) return false;
  if (user.professionalInfo.availability === null) return false;

  if (
    user.professionalInfo.hasStartup === null &&
    user.professionalInfo.hasStartupIdea === null &&
    user.professionalInfo.wantsToCofound === null
  )
    return false;

  if (
    (user.professionalInfo.hasStartup || user.professionalInfo.hasStartupIdea) &&
    (!user.professionalInfo.startupDescription || !user.professionalInfo.startupStage)
  )
    return false;

  if (user.professionalInfo.wantsToCofound && user.matchingPreferences.preferredCompanyStage.length === 0) return false;

  if (user.matchingPreferences.lookingForSkills.length === 0) return false;
  if (user.matchingPreferences.lookingForRoles.length === 0) return false;
  if (user.matchingPreferences.commitmentLevel === null) return false;
  if (user.matchingPreferences.availability === null) return false;
};
