import type { ChangeEvent } from "react";
import { useTempUserStore } from "../../store/useTempUserStore";
import type { UserCommitmentLevel } from "../../../shared/types/UserCommitmentLevel";

export const CommitmentLevelManager = ({ forCurrentUser }: { forCurrentUser: boolean }) => {
  const { tempUser, setTempUser } = useTempUserStore();

  const possibleCommitmentLevels: UserCommitmentLevel[] = [
    "10 to 20 hours per week",
    "20 to 30 hours per week",
    "30 to 40 hours per week",
    "40 to 50 hours per week",
    "50 to 60 hours per week",
    "More than 60 hours per week",
  ];

  const handleCommitmentLevelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!tempUser) return;

    if (forCurrentUser) {
      setTempUser({
        ...tempUser,
        professionalInfo: { ...tempUser.professionalInfo, commitmentLevel: e.target.value as UserCommitmentLevel },
      });

      return;
    }

    setTempUser({
      ...tempUser,
      matchingPreferences: {
        ...tempUser.matchingPreferences,
        commitmentLevel: e.target.value as UserCommitmentLevel,
      },
    });
  };

  return (
    <div className="mt-4 flex gap-2 md:gap-0 flex-col md:flex-row items-start md:items-center justify-between">
      <p className="text-accent">
        {forCurrentUser ? "How committed are you?" : "How committed do you want cofounders to be?"}
      </p>
      <select
        className="select w-full md:w-fit"
        onChange={handleCommitmentLevelChange}
        value={
          forCurrentUser
            ? (tempUser?.professionalInfo.commitmentLevel ?? "")
            : (tempUser?.matchingPreferences.commitmentLevel ?? "")
        }
      >
        <option value="" disabled>
          Select an option
        </option>

        {possibleCommitmentLevels.map((commitmentLevel, id) => {
          return (
            <option key={id} value={commitmentLevel as string}>
              {commitmentLevel}
            </option>
          );
        })}
      </select>
    </div>
  );
};
