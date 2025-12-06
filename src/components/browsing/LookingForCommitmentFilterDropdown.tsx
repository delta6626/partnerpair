import { ChevronDown } from "lucide-react";
import type { UserCommitmentLevel } from "../../../shared/types/UserCommitmentLevel";

export const LookingForCommitmentFilterDropdown = () => {
  const validCommitmentLevels: UserCommitmentLevel[] = [
    "10 to 20 hours per week",
    "20 to 30 hours per week",
    "30 to 40 hours per week",
    "40 to 50 hours per week",
    "50 to 60 hours per week",
    "More than 60 hours per week",
  ];

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <button tabIndex={0} role="button" className="btn">
        Commitment they Seek
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-170 mt-2 p-4"></ul>
    </div>
  );
};
