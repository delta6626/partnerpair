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
        <div className="w-full flex items-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-4 bg-blue-500">
          <LocationFilterDropdown />
          <SkillsFilterDropdown />
          <RolesFilterDropdown />
          <CommitmentLevelFilterDropdown />
          <AvailabilityFilterDropdown />
          <StartupFilterDropdown />
          <LookingForSkillsFilterDropDown />
          <LookingForRolesFilterDropdown />
          <LookingForCommitmentFilterDropdown />
          <LookingForAvailabilityFilterDropdown />

          <button className="btn" onClick={handleResetFilterClick} disabled={searchParams.size === 0}>
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
};
