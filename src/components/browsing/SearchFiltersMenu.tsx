import { RolesFilterDropdown } from "./RolesFilterDropdown";
import { SkillsFilterDropdown } from "./SkillsFilterDropdown";

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
    </div>
  );
};
