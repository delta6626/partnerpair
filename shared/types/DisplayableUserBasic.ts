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
}
