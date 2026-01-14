import type { User } from "./User";

export interface DisplayableUserPro {
  basicInfo: Omit<
    User["basicInfo"],
    | "email"
    | "verified"
    | "authenticationMethod"
    | "profileCompleted"
    | "profileViews"
    | "contactList"
    | "emailNotificationsAllowed"
  >;
  professionalInfo: User["professionalInfo"];
  matchingPreferences: User["matchingPreferences"];
  socialLinks: User["socialLinks"];
}
