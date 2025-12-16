import type { FilteredUser } from "./FilteredProfile";

export interface FilteredUsersPayload {
  users: FilteredUser[];
  currentCursor: number;
  nextCursor: number | null;
}
