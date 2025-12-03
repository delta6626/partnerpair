import { ChevronDown } from "lucide-react";
import type { UserAvailability } from "../../../shared/types/UserAvailability";
import { GenericChip } from "../ProfileViewer/GenericChip";
import { useSearchParams } from "react-router-dom";

export const AvailabilityFilterDropdown = () => {
  const validAvailabilities: UserAvailability[] = [
    "Available immediately",
    "Available within a week",
    "Available within 2 weeks",
    "Available within a month",
    "Available after a month",
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const availabilities = searchParams.get("availability")?.split(",") ?? [];
  const validParameterAvailabilities = availabilities.filter((availability) =>
    validAvailabilities.includes(availability as UserAvailability)
  );

  const handleAvailabilityAddition = (availability: UserAvailability) => {
    if (validParameterAvailabilities.includes(availability as string)) return;

    const updatedAvailabilities = [...validParameterAvailabilities, availability];
    searchParams.set("availability", updatedAvailabilities.join(","));
    setSearchParams(searchParams);
  };

  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Availability
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box w-160 z-1 mt-2 p-4">
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
