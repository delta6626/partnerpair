import { useSearchParams } from "react-router-dom";
import { AvailabilityFilterDropdown } from "./AvailabilityFilterDropdown";
import { CommitmentLevelFilterDropdown } from "./CommitmentLevelFilterDropdown";
import { LocationFilterDropdown } from "./LocationFilterDropdown";
import { LookingForAvailabilityFilterDropdown } from "./LookingForAvailabilityFilterDropdown";
import { LookingForCommitmentFilterDropdown } from "./LookingForCommitmentFilterDropdown";
import { LookingForRolesFilterDropdown } from "./LookingForRolesFilterDropdown";
import { LookingForSkillsFilterDropDown } from "./LookingForSkillsFilterDropdown";
import { RolesFilterDropdown } from "./RolesFilterDropdown";
import { SkillsFilterDropdown } from "./SkillsFilterDropdown";
import { StartupFilterDropdown } from "./StartupFilterDropdown";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import type { UserTier } from "../../../shared/types/UserTier";
import { Loader } from "../Loader";
import { BROWSE } from "../../../shared/constants/BROWSE";

export const SearchFiltersMenu = () => {
  /*
  Relevant properties to be included for filtering.

  basicInfo.location // Pay wall
  basicInfo.profileCompleted
  
  professionalInfo.skills
  professonalInfo.roles
  professionalInfo.commitmentLevel // Pay wall
  professionalInfo.availability // Pay wall
  professionalInfo.hasStartup
  professionalInfo.startupStage
  professonalInfo.wantsToCofound

  matchingPreferences.lookingForSkills 
  matchingPreferences.lookingForRoles
  matchingPreferences.commitmentLevel // Pay wall
  matchingPreferences.availability // Pay wall
  */

  const getUserTier = httpsCallable(functions, "getUserTier");
  const {
    data: userTier,
    isLoading: isUserTierLoading,
    isError: isUserTierError,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER_TIER],
    queryFn: async () => {
      const response = await getUserTier();
      return response.data as UserTier;
    },
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const handleResetFilterClick = () => {
    setSearchParams({});
  };

  return (
    <>
      {isUserTierLoading ? (
        <div className="w-full flex flex-col items-center">
          <Loader />
        </div>
      ) : isUserTierError ? (
        <div className="w-full flex flex-col items-center">
          <p className="text-accent">{BROWSE.USER_TIER_LOADING_ERROR}</p>
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-4">
          <LocationFilterDropdown userTier={userTier ?? "Basic"} />
          <SkillsFilterDropdown />
          <RolesFilterDropdown />
          <CommitmentLevelFilterDropdown userTier={userTier ?? "Basic"} />
          <AvailabilityFilterDropdown userTier={userTier ?? "Basic"} />
          <StartupFilterDropdown />
          <LookingForSkillsFilterDropDown />
          <LookingForRolesFilterDropdown />
          <LookingForCommitmentFilterDropdown userTier={userTier ?? "Basic"} />
          <LookingForAvailabilityFilterDropdown userTier={userTier ?? "Basic"} />

          <button className="btn" onClick={handleResetFilterClick} disabled={searchParams.size === 0}>
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
};
