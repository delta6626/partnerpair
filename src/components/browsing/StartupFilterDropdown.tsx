import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const StartupFilterDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showStartupOwners, setShowStartupOwners] = useState<boolean | null>(null);
  const [showStartupSeekers, setShowStartupSeekers] = useState<boolean | null>(null);

  let profileType = searchParams.get("profileType") ?? "";
  let preferredStartupStages = searchParams.get("preferredStartupStages") ?? "";

  const handleShowStartupOwners = () => {
    setShowStartupOwners(true);
    setShowStartupSeekers(false);

    profileType = "startupOwner";
    searchParams.set("profileType", profileType);
    setSearchParams(searchParams);
  };

  const handleShowStartupSeekers = () => {
    setShowStartupSeekers(true);
    setShowStartupOwners(false);

    profileType = "startupSeeker";
    searchParams.set("profileType", profileType);
    setSearchParams(searchParams);
  };

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
      </ul>
    </div>
  );
};
