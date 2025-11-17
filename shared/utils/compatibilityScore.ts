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

  const skillMatchForUserB = jaccardIndex(b.matchingPreferences.lookingForSkills, a.professionalInfo.skills);
  const roleMatchForUserB = jaccardIndex(b.matchingPreferences.lookingForRoles, a.professionalInfo.roles);
  const commitmentLevelMatchForUserB = enumEqual(
    a.professionalInfo.commitmentLevel,
    b.matchingPreferences.commitmentLevel
  );
  const availabilityMatchForUserB = enumEqual(a.professionalInfo.availability, b.matchingPreferences.commitmentLevel);

  const canBePartners =
    (a.professionalInfo.hasStartup && b.professionalInfo.wantsToCofound) ||
    (a.professionalInfo.wantsToCofound && b.professionalInfo.hasStartup)
      ? 1
      : 0;
};
