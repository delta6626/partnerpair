import type { User } from "./User";

export interface SuggestedProfile {
  user: User & { id: string };
  compatibilityScore: number;
}
