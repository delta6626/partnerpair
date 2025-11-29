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

  return (
    <div className="w-full flex flex-wrap gap-4">
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
    </div>
  );
};
