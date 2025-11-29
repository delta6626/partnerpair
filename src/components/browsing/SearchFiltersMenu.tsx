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
      <div className="dropdown dropdown-bottom">
        <button tabIndex={0} role="button" className="btn">
          Skills
        </button>

        <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2"></ul>
      </div>
    </div>
  );
};
