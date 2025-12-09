import { ChevronDown } from "lucide-react";
import type { UserAvailability } from "../../../shared/types/UserAvailability";

export const LookingForAvailabilityFilterDropdown = () => {
  const validAvailabilities: UserAvailability[] = [
    "Available immediately",
    "Available within a week",
    "Available within 2 weeks",
    "Available within a month",
    "Available after a month",
  ];

  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Availability they Seek
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box w-160 z-1 mt-2 p-4"></ul>
    </div>
  );
};
