import type { User } from "../types/User";
import { enumEqual } from "./enumEqual";
import { jaccardIndex } from "./jaccardIndex";

export const compatibilityScore = (a: User, b: User) => {
  let score = 0;

  // Individual role and skill based matching

  const skillMatchForUserA = jaccardIndex(a.matchingPreferences.lookingForSkills, b.professionalInfo.skills);
  const roleMatchForUserA = jaccardIndex(a.matchingPreferences.lookingForRoles, b.professionalInfo.roles);
  const skillMatchForUserB = jaccardIndex(b.matchingPreferences.lookingForSkills, a.professionalInfo.skills);
  const roleMatchForUserB = jaccardIndex(b.matchingPreferences.lookingForRoles, a.professionalInfo.roles);

  // Individual commitment and availability based matching

  const commitmentLevelMatchForUserA = enumEqual(
    a.matchingPreferences.commitmentLevel,
    b.professionalInfo.commitmentLevel
  );
  const commitmentLevelMatchForUserB = enumEqual(
    b.matchingPreferences.commitmentLevel,
    a.professionalInfo.commitmentLevel
  );
  const availabilityMatchForUserA = enumEqual(a.matchingPreferences.availability, b.professionalInfo.availability);
  const availabilityMatchForUserB = enumEqual(b.matchingPreferences.availability, a.professionalInfo.availability);

  // Mutual commitment and availability based matching

  const commitmentLevelMutualMatch = enumEqual(a.professionalInfo.commitmentLevel, b.professionalInfo.commitmentLevel);
  const AvailabilityMutualMatch = enumEqual(a.professionalInfo.availability, b.professionalInfo.availability);

  // Check if a user owns a startup and the other user wants to join the startup

  const canBePartners =
    (a.professionalInfo.hasStartup && b.professionalInfo.wantsToCofound) ||
    (a.professionalInfo.wantsToCofound && b.professionalInfo.hasStartup)
      ? 1
      : 0;
};
