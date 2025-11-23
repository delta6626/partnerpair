import type { User } from "./User";

export type SuggestedProfile = {
  id: string;
  profileImageURL: User["basicInfo"]["profileImageUrl"];
  firstName: User["basicInfo"]["firstName"];
  lastName: User["basicInfo"]["lastName"];
  tier: User["basicInfo"]["tier"];
  headline: User["professionalInfo"]["headline"];
  bio: User["professionalInfo"]["bio"];
  roles: User["professionalInfo"]["roles"];
  hasStartup: User["professionalInfo"]["hasStartup"];
  wantsToCofound: User["professionalInfo"]["wantsToCofound"];
  startupDescription: User["professionalInfo"]["startupDescription"];
  score: number;
};
