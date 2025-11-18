import type { User } from "./User";

export interface SuggestedProfile {
  user: User;
  compatibilityScore: number;
}
