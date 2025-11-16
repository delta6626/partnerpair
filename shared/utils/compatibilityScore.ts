import type { User } from "../types/User";
import { enumEqual } from "./enumEqual";
import { jaccardIndex } from "./jaccardIndex";

export const compatibilityScore = (a: User, b: User) => {
  let score = 0;

  const skillSimilarity = jaccardIndex(a.matchingPreferences.lookingForSkills, b.professionalInfo.skills);
  const roleSimilarity = jaccardIndex(a.matchingPreferences.lookingForRoles, b.professionalInfo.roles);
  const commitmentLevelMatch = enumEqual(a.matchingPreferences.commitmentLevel, b.professionalInfo.commitmentLevel);
  const availabilityMatch = enumEqual(a.professionalInfo.availability, b.professionalInfo.availability);
};
