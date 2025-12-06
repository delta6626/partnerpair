import { ChevronDown, XIcon } from "lucide-react";
import type { UserAvailability } from "../../../shared/types/UserAvailability";
import { GenericChip } from "../ProfileViewer/GenericChip";
import { useSearchParams } from "react-router-dom";
import { BROWSE } from "../../../shared/constants/BROWSE";

export const AvailabilityFilterDropdown = () => {
  const validAvailabilities: UserAvailability[] = [
    "Available immediately",
    "Available within a week",
    "Available within 2 weeks",
    "Available within a month",
    "Available after a month",
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const availabilities = searchParams.get(BROWSE.PARAM_AVAILABILITY)?.split(",") ?? [];
  const validParameterAvailabilities = availabilities.filter((availability) =>
    validAvailabilities.includes(availability as UserAvailability)
  );

  const handleAvailabilityAddition = (availability: UserAvailability) => {
    if (validParameterAvailabilities.includes(availability as string)) return;

    const updatedAvailabilities = [...validParameterAvailabilities, availability];
    searchParams.set(BROWSE.PARAM_AVAILABILITY, updatedAvailabilities.join(","));
    setSearchParams(searchParams);
  };

  const handleAvailabilityDeletion = (availability: string) => {
    const updatedAvailabilities = validParameterAvailabilities.filter((item) => item !== availability);
    if (updatedAvailabilities.length === 0) {
      searchParams.delete(BROWSE.PARAM_AVAILABILITY);
    } else {
      searchParams.set(BROWSE.PARAM_AVAILABILITY, updatedAvailabilities.join(","));
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Availability
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box w-160 z-1 mt-2 p-4">
        <div>
          {validParameterAvailabilities.length > 0 && <h1 className="text-accent">Selected</h1>}
          {validParameterAvailabilities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 mb-4">
              {validParameterAvailabilities.map((availability) => {
                return (
                  <GenericChip
                    key={`selected-${availability}`}
                    chipText={availability}
                    onClick={() => {
                      handleAvailabilityDeletion(availability);
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
            {validAvailabilities.map((availability) => {
              return (
                <GenericChip
                  key={`option-${availability}`}
                  chipText={availability as string}
                  onClick={() => {
                    handleAvailabilityAddition(availability);
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
