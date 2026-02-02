import { ChevronDown, XIcon } from "lucide-react";
import type { UserAvailability } from "../../../shared/types/UserAvailability";
import { useSearchParams } from "react-router-dom";
import { BROWSE } from "../../../shared/constants/BROWSE";
import { GenericChip } from "../ProfileViewer/GenericChip";
import type { UserTier } from "../../../shared/types/UserTier";
import { ProBadge } from "../user/ProBadge";

export const LookingForAvailabilityFilterDropdown = ({ userTier }: { userTier: UserTier }) => {
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
    validAvailabilities.includes(availability as UserAvailability),
  );

  const handleAvailabilityAddition = (availability: string) => {
    if (validParameterAvailabilitiesSought.includes(availability)) return;

    const updatedAvailabilitiesSought = [...validParameterAvailabilitiesSought, availability];
    searchParams.set(BROWSE.PARAM_AVAILABILITY_SOUGHT, updatedAvailabilitiesSought.join(","));
    setSearchParams(searchParams);
  };

  const handleAvailabilityDeletion = (availabilityToDelete: string) => {
    const updatedAvailabilitiesSought = validParameterAvailabilitiesSought.filter(
      (availability) => availability != availabilityToDelete,
    );

    if (updatedAvailabilitiesSought.length === 0) {
      searchParams.delete(BROWSE.PARAM_AVAILABILITY_SOUGHT);
    } else {
      searchParams.set(BROWSE.PARAM_AVAILABILITY_SOUGHT, updatedAvailabilitiesSought.join(","));
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="dropdown lg:dropdown-end xl:dropdown-start 2xl:dropdown-end">
      <button tabIndex={0} role="button" className="btn w-full flex justify-between" disabled={userTier === "Basic"}>
        {userTier === "Basic" && <ProBadge />}
        <p>Availability they Seek</p>
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box w-160 z-1 mt-2 p-4">
        <div className="">
          {validParameterAvailabilitiesSought.length > 0 && <h1 className="text-accent">Selected</h1>}
          {validParameterAvailabilitiesSought.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 mb-4">
              {validParameterAvailabilitiesSought.map((availability) => {
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
                    handleAvailabilityAddition(availability as string);
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
