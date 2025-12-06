import { ChevronDown, XIcon } from "lucide-react";
import type { UserCommitmentLevel } from "../../../shared/types/UserCommitmentLevel";
import { useSearchParams } from "react-router-dom";
import { GenericChip } from "../ProfileViewer/GenericChip";

export const LookingForCommitmentFilterDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const validCommitmentLevels: UserCommitmentLevel[] = [
    "10 to 20 hours per week",
    "20 to 30 hours per week",
    "30 to 40 hours per week",
    "40 to 50 hours per week",
    "50 to 60 hours per week",
    "More than 60 hours per week",
  ];

  const commitmentLevels = searchParams.get("lookingForCommitments")?.split(",") ?? [];
  const validParameterCommitmentLevels = commitmentLevels.filter((level: string) =>
    validCommitmentLevels.includes(level as UserCommitmentLevel)
  );

  const handleCommitmentLevelAddition = (commitmentLevel: string) => {
    if (validParameterCommitmentLevels.includes(commitmentLevel)) return;
    const updatedCommitmentLevels = [...validParameterCommitmentLevels, commitmentLevel];
    searchParams.set("lookingForCommitments", updatedCommitmentLevels.join(","));
    setSearchParams(searchParams);
  };

  const handleCommitmentLevelDeletion = (commitmentLevel: string) => {
    const updatedCommitmentLevels = validParameterCommitmentLevels.filter((level) => level !== commitmentLevel);
    if (updatedCommitmentLevels.length === 0) {
      searchParams.delete("lookingForCommitments");
    } else {
      searchParams.set("lookingForCommitments", updatedCommitmentLevels.join(","));
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <button tabIndex={0} role="button" className="btn">
        Commitment they Seek
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-170 mt-2 p-4">
        <div>
          {validParameterCommitmentLevels.length > 0 && <h1 className="text-accent">Selected</h1>}
          {validParameterCommitmentLevels.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 mb-4">
              {validParameterCommitmentLevels.map((commitmentLevel) => {
                return (
                  <GenericChip
                    key={`selected-${commitmentLevel}`}
                    chipText={commitmentLevel}
                    onClick={() => {
                      handleCommitmentLevelDeletion(commitmentLevel);
                    }}
                  >
                    <XIcon size={20} className="hover:text-error focus:text-error ease-in-out duration-200" />
                  </GenericChip>
                );
              })}
            </div>
          )}
        </div>

        <div className="">
          <h1 className="text-accent">Options</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {validCommitmentLevels.map((commitmentLevel) => {
              return (
                <GenericChip
                  key={`option-${commitmentLevel}`}
                  chipText={commitmentLevel as string}
                  onClick={() => {
                    handleCommitmentLevelAddition(commitmentLevel as string);
                  }}
                />
              );
            })}
          </div>
        </div>
      </ul>
    </div>
  );
};
