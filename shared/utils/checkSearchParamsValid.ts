export const checkSearchParamsValid = (rawSearchParams: Record<string, string>) => {
  if (
    !rawSearchParams ||
    typeof rawSearchParams.name !== "string" ||
    typeof rawSearchParams.location !== "string" ||
    !Array.isArray(rawSearchParams.skills) ||
    !Array.isArray(rawSearchParams.roles) ||
    !Array.isArray(rawSearchParams.commitmentLevels) ||
    !Array.isArray(rawSearchParams.availabilities) ||
    !["", "startupOwner", "startupSeeker"].includes(rawSearchParams.profileType) ||
    !Array.isArray(rawSearchParams.preferredStartupStages) ||
    !Array.isArray(rawSearchParams.skillsSought) ||
    !Array.isArray(rawSearchParams.rolesSought) ||
    !Array.isArray(rawSearchParams.commitmentLevelsSought) ||
    !Array.isArray(rawSearchParams.availabilitiesSought)
  )
    return false;
  return true;
};
