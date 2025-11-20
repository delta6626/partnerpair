import type { User } from "./User";

export type SuggestedProfile = {
  id: string;
  profileImageURL: User["basicInfo"]["profileImageUrl"];
  firstName: User["basicInfo"]["firstName"];
  lastName: User["basicInfo"]["lastName"];
  headline: User["professionalInfo"]["headline"];
  roles: User["professionalInfo"]["roles"];
  score: number;
};
