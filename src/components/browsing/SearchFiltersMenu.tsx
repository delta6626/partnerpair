import { AvailabilityFilterDropdown } from "./AvailabilityFilterDropdown";
import { CommitmentLevelFilterDropdown } from "./CommitmentLevelFilterDropdown";
import { LookingForSkillsDropDown } from "./LookingForSkillsFilterDropdown";
import { RolesFilterDropdown } from "./RolesFilterDropdown";
import { SkillsFilterDropdown } from "./SkillsFilterDropdown";
import { StartupFilterDropdown } from "./StartupFilterDropdown";

export const SearchFiltersMenu = () => {
  /*
  Relevant properties to be included for filtering.

  basicInfo.location
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
  matchingPreferences.preferredCompanyStage
  */

  return (
    <div className="min-w-full bg-blue-50">
      <SkillsFilterDropdown />
      <RolesFilterDropdown />
      <CommitmentLevelFilterDropdown />
      <AvailabilityFilterDropdown />
      <StartupFilterDropdown />
      <LookingForSkillsDropDown />
    </div>
  );
};
