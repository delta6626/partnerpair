import { ChevronDown } from "lucide-react";
import type { UserAvailability } from "../../../shared/types/UserAvailability";
import { GenericChip } from "../ProfileViewer/GenericChip";

export const AvailabilityFilterDropdown = () => {
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
        Availability
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2">
        <div className="">
          {validAvailabilities.map((availability) => {
            return <GenericChip key={`option-${availability}`} chipText={availability as string} fallbackText="" />;
          })}
        </div>
      </ul>
    </div>
  );
};
