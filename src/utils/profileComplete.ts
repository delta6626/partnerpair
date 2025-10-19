import { SETTINGS } from "../../shared/constants/SETTINGS";
import type { User } from "../../shared/types/User";

export const profileComplete = (user: User) => {
  if (user.basicInfo.dateOfBirth === "") return [false, SETTINGS.COMPLETE_BASIC_PROFILE];
  if (user.basicInfo.phone === "") return [false, SETTINGS.COMPLETE_BASIC_PROFILE];
  if (user.professionalInfo.headline === "") return [false, SETTINGS.COMPLETE_PROFESSIONAL_INFORMATION];
  if (user.professionalInfo.bio === "") return [false, SETTINGS.COMPLETE_PROFESSIONAL_INFORMATION];
  if (user.professionalInfo.skills.length === 0) return [false, SETTINGS.COMPLETE_PROFESSIONAL_INFORMATION];
  if (user.professionalInfo.roles.length === 0) return [false, SETTINGS.COMPLETE_PROFESSIONAL_INFORMATION];
  if (user.professionalInfo.commitmentLevel === null) return [false, SETTINGS.COMPLETE_PROFESSIONAL_INFORMATION];
  if (user.professionalInfo.availability === null) return [false, SETTINGS.COMPLETE_PROFESSIONAL_INFORMATION];

  if (user.professionalInfo.hasStartup === null && user.professionalInfo.wantsToCofound === null)
    return [false, SETTINGS.COMPLETE_STARTUP_INFORMATION];

  if (
    user.professionalInfo.hasStartup &&
    (!user.professionalInfo.startupDescription || !user.professionalInfo.startupStage)
  )
    return [false, SETTINGS.COMPLETE_STARTUP_INFORMATION];

  if (user.professionalInfo.wantsToCofound && user.matchingPreferences.preferredCompanyStage.length === 0)
    return [false, SETTINGS.COMPLETE_MATCHING_PREFERENCES];

  if (user.matchingPreferences.lookingForSkills.length === 0) return [false, SETTINGS.COMPLETE_MATCHING_PREFERENCES];
  if (user.matchingPreferences.lookingForRoles.length === 0) return [false, SETTINGS.COMPLETE_MATCHING_PREFERENCES];
  if (user.matchingPreferences.commitmentLevel === null) return [false, SETTINGS.COMPLETE_MATCHING_PREFERENCES];
  if (user.matchingPreferences.availability === null) return [false, SETTINGS.COMPLETE_MATCHING_PREFERENCES];

  if (
    user.socialLinks.github === "" &&
    user.socialLinks.linkedin === "" &&
    user.socialLinks.twitter === "" &&
    user.socialLinks.website == ""
  )
    return [false, SETTINGS.COMPLETE_SOCIAL_PROFILES];

  return true;
};
