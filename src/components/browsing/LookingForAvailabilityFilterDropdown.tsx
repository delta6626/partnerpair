import { ChevronDown } from "lucide-react";
import type { UserAvailability } from "../../../shared/types/UserAvailability";
import { useSearchParams } from "react-router-dom";
import { BROWSE } from "../../../shared/constants/BROWSE";
import { GenericChip } from "../ProfileViewer/GenericChip";

export const LookingForAvailabilityFilterDropdown = () => {
  const validAvailabilities: UserAvailability[] = [
    "Available immediately",
    "Available within a week",
    "Available within 2 weeks",
    "Available within a month",
    "Available after a month",
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const availabilitiesSought = searchParams.get(BROWSE.PARAM_AVAILABILITY_SOUGHT)?.split(",") ?? [];
  const validParameterAvailabilitiesSought = availabilitiesSought.filter((availability) =>
    validAvailabilities.includes(availability as UserAvailability)
  );

  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Availability they Seek
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box w-160 z-1 mt-2 p-4">
        <div className="">
          <h1 className="text-accent">Options</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {validAvailabilities.map((availability) => {
              return <GenericChip key={`option-${availability}`} chipText={availability as string} />;
            })}
          </div>
        </div>
      </ul>
    </div>
  );
};
