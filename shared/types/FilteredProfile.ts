import type { SuggestedProfile } from "./SuggestedProfile";

export type FilteredUser = Omit<SuggestedProfile, "score">;
