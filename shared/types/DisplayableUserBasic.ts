import type { User } from "./User";

export interface DisplayableUserBasic {
  basicInfo: Omit<
    User["basicInfo"],
    | "dateOfBirth"
    | "email"
    | "phone"
    | "verified"
    | "authenticationMethod"
    | "profileCompleted"
    | "profileViews"
    | "contactList"
    | "createdAt"
  >;

  professionalInfo: Omit<User["professionalInfo"], "commitmentLevel" | "availability" | "education">;
  matchingPreferences: Omit<User["matchingPreferences"], "commitmentLevel" | "availability">;
}
