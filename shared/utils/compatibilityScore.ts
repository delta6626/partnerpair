import type { User } from "../types/User";
import { enumEqual } from "./enumEqual";
import { jaccardIndex } from "./jaccardIndex";

export const compatibilityScore = (a: User, b: User) => {
  let score = 0;

  const skillMatchForUserA = jaccardIndex(a.matchingPreferences.lookingForSkills, b.professionalInfo.skills);
  const roleMatchForUserA = jaccardIndex(a.matchingPreferences.lookingForRoles, b.professionalInfo.roles);

  const commitmentLevelMatch = enumEqual(a.matchingPreferences.commitmentLevel, b.professionalInfo.commitmentLevel);
  const availabilityMatch = enumEqual(a.matchingPreferences.availability, b.professionalInfo.availability);
};
