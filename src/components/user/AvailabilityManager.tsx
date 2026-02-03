import type { ChangeEvent } from "react";
import { useTempUserStore } from "../../store/useTempUserStore";
import type { UserAvailability } from "../../../shared/types/UserAvailability";

export const AvailabilityManager = ({ forCurrentUser }: { forCurrentUser: boolean }) => {
  const { tempUser, setTempUser } = useTempUserStore();

  const possibleAvailabilities: UserAvailability[] = [
    "Available immediately",
    "Available within a week",
    "Available within 2 weeks",
    "Available within a month",
    "Available after a month",
  ];

  const handleAvailabilityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!tempUser) return;

    if (forCurrentUser) {
      setTempUser({
        ...tempUser,
        professionalInfo: { ...tempUser.professionalInfo, availability: e.target.value as UserAvailability },
      });

      return;
    }

    setTempUser({
      ...tempUser,
      matchingPreferences: {
        ...tempUser.matchingPreferences,
        availability: e.target.value as UserAvailability,
      },
    });
  };

  return (
    <div className="mt-4 w-full flex flex-col gap-2 md:gap-0 items-start md:flex-row md:items-center justify-between">
      <p className="text-accent">
        {forCurrentUser ? "When are you available?" : "When do you want cofounders to be available?"}
      </p>
      <select
        className="select w-full md:w-fit"
        value={
          forCurrentUser
            ? (tempUser?.professionalInfo.availability ?? "")
            : (tempUser?.matchingPreferences.availability ?? "")
        }
        onChange={handleAvailabilityChange}
      >
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
