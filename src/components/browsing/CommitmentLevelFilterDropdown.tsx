import { ChevronDown } from "lucide-react";
import type { UserCommitmentLevel } from "../../../shared/types/UserCommitmentLevel";
import { GenericChip } from "../ProfileViewer/GenericChip";

export const CommitmentLevelFilterDropdown = () => {
  const validCommitmentLevels: UserCommitmentLevel[] = [
    "10 to 20 hours per week",
    "20 to 30 hours per week",
    "30 to 40 hours per week",
    "40 to 50 hours per week",
    "50 to 60 hours per week",
    "More than 60 hours per week",
  ];

  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Commitment Level
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-170 mt-2 p-4">
        <div className="">
          <h1 className="text-accent">Available Roles</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {validCommitmentLevels.map((commitmentLevel) => {
              return <GenericChip key={`available-${commitmentLevel}`} chipText={commitmentLevel as string} />;
            })}
          </div>
        </div>
      </ul>
    </div>
  );
};
