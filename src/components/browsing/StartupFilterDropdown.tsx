import { ChevronDown, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { UserPreferredCompanyStage } from "../../../shared/types/UserPreferredCompanyStage";
import { GenericChip } from "../ProfileViewer/GenericChip";

export const StartupFilterDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showStartupOwners, setShowStartupOwners] = useState<boolean | null>(null);
  const [showStartupSeekers, setShowStartupSeekers] = useState<boolean | null>(null);

  const validPreferredStartupStages: UserPreferredCompanyStage[] = [
    "Idea",
    "Building MVP",
    "Just Launched",
    "Growing",
    "Established",
  ];

  const profileType = searchParams.get("profileType") ?? "";
  const preferredStartupStages = searchParams.get("preferredStartupStages")?.split(",") || [];
  const validParameterPreferredStartupStages = preferredStartupStages.filter((stage) =>
    validPreferredStartupStages.includes(stage as UserPreferredCompanyStage)
  );

  const handleShowStartupOwners = () => {
    setShowStartupOwners(true);
    setShowStartupSeekers(false);

    searchParams.set("profileType", "startupOwner");
    setSearchParams(searchParams);
  };

  const handleShowStartupSeekers = () => {
    setShowStartupSeekers(true);
    setShowStartupOwners(false);

    searchParams.set("profileType", "startupSeeker");
    setSearchParams(searchParams);
  };

  const handleStageAddition = (stage: UserPreferredCompanyStage) => {
    if (validParameterPreferredStartupStages.includes(stage as string)) return;
    const updatedStages = [...validParameterPreferredStartupStages, stage];
    searchParams.set("preferredStartupStages", updatedStages.join(","));
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (profileType === "startupOwner") {
      setShowStartupOwners(true);
      setShowStartupSeekers(false);
    } else if (profileType === "startupSeeker") {
      setShowStartupSeekers(true);
      setShowStartupOwners(false);
    } else {
      setShowStartupOwners(null);
      setShowStartupSeekers(null);
    }
  }, [profileType, preferredStartupStages]);

  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Startup Preferences
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 w-100 rounded-box z-1 mt-2 p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1>Show users with startups</h1>
            <input
              type="radio"
              className="radio"
              checked={showStartupOwners ? showStartupOwners : false}
              onChange={handleShowStartupOwners}
            />
          </div>
          <div className="flex items-center justify-between">
            <h1>Show users who want to join a startup</h1>
            <input
              type="radio"
              className="radio"
              checked={showStartupSeekers ? showStartupSeekers : false}
              onChange={handleShowStartupSeekers}
            />
          </div>
        </div>

        {validParameterPreferredStartupStages.length > 0 && (
          <div className="mt-4">
            <h1 className="text-accent">Preferred Startup Stages</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {validParameterPreferredStartupStages.map((stage) => {
                return (
                  <GenericChip key={`selected-${stage}`} chipText={stage}>
                    <XIcon size={20} />
                  </GenericChip>
                );
              })}
            </div>
          </div>
        )}

        {showStartupOwners && (
          <div className="mt-4">
            <h1 className="text-accent">Startup Stage Options</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {validPreferredStartupStages.map((stage) => {
                return (
                  <GenericChip
                    key={`option-${stage}`}
                    chipText={stage as string}
                    onClick={() => {
                      handleStageAddition(stage);
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};
