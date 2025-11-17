import type { User } from "../types/User";
import { enumEqual } from "./enumEqual";
import { jaccardIndex } from "./jaccardIndex";

export const compatibilityScore = (a: User, b: User) => {
  let score = 0;

  const skillMatchForUserA = jaccardIndex(a.matchingPreferences.lookingForSkills, b.professionalInfo.skills);
  const roleMatchForUserA = jaccardIndex(a.matchingPreferences.lookingForRoles, b.professionalInfo.roles);

  const commitmentLevelMatchForUserA = enumEqual(
    a.matchingPreferences.commitmentLevel,
    b.professionalInfo.commitmentLevel
  );
  const availabilityMatchForUserA = enumEqual(a.matchingPreferences.availability, b.professionalInfo.availability);

  const skillMatchForUserB = jaccardIndex(a.professionalInfo.skills, b.matchingPreferences.lookingForSkills);
  const roleMatchForUserB = jaccardIndex(a.professionalInfo.roles, b.matchingPreferences.lookingForRoles);
  const commitmentLevelMatchForUserB = enumEqual(
    a.professionalInfo.commitmentLevel,
    b.matchingPreferences.commitmentLevel
  );
  const availabilityMatchForUserB = enumEqual(a.professionalInfo.availability, b.matchingPreferences.commitmentLevel);
};
