import type { User } from "../types/User";
import { enumEqual } from "./enumEqual";
import { jaccardIndex } from "./jaccardIndex";

export const compatibilityScore = (a: User, b: User) => {
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

  // How fit B is for A
  const scoreA =
    skillMatchForUserA * 0.15 +
    roleMatchForUserA * 0.1 +
    commitmentLevelMatchForUserA * 0.025 +
    availabilityMatchForUserA * 0.025;

  // How fit A is for B
  const scoreB =
    skillMatchForUserB * 0.15 +
    roleMatchForUserB * 0.1 +
    commitmentLevelMatchForUserB * 0.025 +
    availabilityMatchForUserB * 0.025;

  // How fit are A & B for each other in terms of commitment and availability
  const mutual = commitmentLevelMutualMatch * 0.15 + AvailabilityMutualMatch * 0.15;

  // Startup partner check
  const startup = canBePartners * 0.1;

  const finalScore = scoreA + scoreB + mutual + startup;

  return finalScore; // 0 (Bad fit) - 1 (Excellent fit)
};
