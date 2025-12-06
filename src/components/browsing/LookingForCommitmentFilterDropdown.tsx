import { ChevronDown } from "lucide-react";

export const LookingForCommitmentFilterDropdown = () => {
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
