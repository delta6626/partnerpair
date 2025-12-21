import type { UserAvailability } from "./UserAvailability";
import type { UserCommitmentLevel } from "./UserCommitmentLevel";
import type { UserPreferredCompanyStage } from "./UserPreferredCompanyStage";
import type { UserRole } from "./UserRole";

export interface SearchParams {
  name: string | "";
  location: string | "";
  skills: string[];
  roles: UserRole[];
  commitmentLevels: UserCommitmentLevel[];
  availabilities: UserAvailability[];
  profileType: "startupOwner" | "startupSeeker" | "";
  preferredStartupStages: UserPreferredCompanyStage[];
  skillsSought: string[];
  rolesSought: UserRole[];
  commitmentLevelsSought: UserCommitmentLevel[];
  availabilitiesSought: UserAvailability[];
}
