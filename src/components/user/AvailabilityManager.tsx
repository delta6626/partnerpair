import { useTempUserStore } from "../../store/useTempUserStore";
import type { UserAvailability } from "../../types/UserAvailability";

export const AvailabilityManager = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  const possibleAvailabilities: UserAvailability[] = [
    "Available immediately",
    "Available within a week",
    "Available within 2 weeks",
    "Available within a month",
    "Available after a month",
  ];

  return (
    <div className="mt-4 w-full flex items-center justify-between">
      <p>When would you like cofounders to be available?</p>
      <select className="select" value={tempUser?.matchingPreferences.availability as string}>
        <option value={""} disabled>
          Select an option
        </option>

        {possibleAvailabilities.map((availability, id) => {
          return (
            <option key={id} value={availability as string}>
              {availability}
            </option>
          );
        })}
      </select>
    </div>
  );
};
