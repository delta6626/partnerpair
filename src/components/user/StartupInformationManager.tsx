import { Rocket } from "lucide-react";
import { useTempUserStore } from "../../store/useTempUserStore";
import { SETTINGS } from "../../constants/SETTINGS";
import type { ChangeEvent } from "react";
import type { UserPreferredCompanyStage } from "../../types/UserPreferredCompanyStage";

export const StartupInformationManager = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  if (!tempUser) return;

  const handleUserHasStartup = () => {
    setTempUser({
      ...tempUser,
      professionalInfo: {
        ...tempUser.professionalInfo,
        hasStartup: true,
        hasStartupIdea: false,
        wantsToCofound: false,
      },
    });
  };

  const handleUserDoesNotHaveStartup = () => {
    setTempUser({ ...tempUser, professionalInfo: { ...tempUser.professionalInfo, hasStartup: false } });
  };

  const handleUserHasIdea = () => {
    setTempUser({
      ...tempUser,
      professionalInfo: {
        ...tempUser.professionalInfo,
        hasStartupIdea: true,
        hasStartup: false,
        wantsToCofound: false,
      },
    });
  };

  const handleUserDoesNotHaveIdea = () => {
    setTempUser({ ...tempUser, professionalInfo: { ...tempUser.professionalInfo, hasStartupIdea: false } });
  };

  const handleUserWantsToCofound = () => {
    setTempUser({
      ...tempUser,
      professionalInfo: {
        ...tempUser.professionalInfo,
        hasStartupIdea: false,
        hasStartup: false,
        wantsToCofound: true,
        startupStage: null,
        startupDescription: "",
      },
    });
  };

  const handleUserDoesNotWantToCofound = () => {
    setTempUser({
      ...tempUser,
      professionalInfo: {
        ...tempUser.professionalInfo,
        wantsToCofound: false,
      },
    });
  };

  const handleStartupStageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTempUser({
      ...tempUser,
      professionalInfo: {
        ...tempUser.professionalInfo,
        startupStage: e.target.value as UserPreferredCompanyStage,
      },
    });
  };

  const handleStartupDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTempUser({
      ...tempUser,
      professionalInfo: {
        ...tempUser.professionalInfo,
        startupDescription: e.target.value,
      },
    });
  };

  return (
    <div className="max-w-200 border-1 border-accent rounded-3xl p-4">
      <div className="flex items-center gap-2">
        <Rocket />
        <h1 className="text-lg">Startup Information</h1>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p>Do you have a startup?</p>
          <div className="flex gap-4 ">
            <div className="flex gap-2">
              <p>Yes</p>
              <input
                type="radio"
                className="radio radio-primary"
                checked={tempUser?.professionalInfo.hasStartup === true}
                onChange={handleUserHasStartup}
              />
            </div>
            <div className="flex gap-2">
              <p>No</p>
              <input
                type="radio"
                className="radio radio-primary"
                checked={tempUser.professionalInfo.hasStartup === false}
                onChange={handleUserDoesNotHaveStartup}
              />
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p>Do you have an idea for a startup?</p>
          <div className="flex gap-4 ">
            <div className="flex gap-2">
              <p>Yes</p>
              <input
                type="radio"
                className="radio radio-primary"
                checked={tempUser?.professionalInfo.hasStartupIdea === true}
                onChange={handleUserHasIdea}
              />
            </div>
            <div className="flex gap-2">
              <p>No</p>
              <input
                type="radio"
                className="radio radio-primary"
                checked={tempUser.professionalInfo.hasStartupIdea === false}
                onChange={handleUserDoesNotHaveIdea}
              />
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p>Do you want to join someone else's startup as a co-founder?</p>
          <div className="flex gap-4 ">
            <div className="flex gap-2">
              <p>Yes</p>
              <input
                type="radio"
                className="radio radio-primary"
                checked={tempUser?.professionalInfo.wantsToCofound === true}
                onChange={handleUserWantsToCofound}
              />
            </div>
            <div className="flex gap-2">
              <p>No</p>
              <input
                type="radio"
                className="radio radio-primary"
                checked={tempUser.professionalInfo.wantsToCofound === false}
                onChange={handleUserDoesNotWantToCofound}
              />
            </div>
          </div>
        </div>

        <div
          className={`mt-4 ${
            tempUser.professionalInfo.hasStartup || tempUser.professionalInfo.hasStartupIdea ? "visible" : "hidden"
          } flex items-center justify-between`}
        >
          <p>What stage is your startup in?</p>
          <select
            className="select max-w-45"
            value={tempUser.professionalInfo.startupStage ?? ""}
            onChange={handleStartupStageChange}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="idea">Idea</option>
            <option value="buildingMVP">Building MVP</option>
            <option value="justLaunched">Just Launched</option>
            <option value="growing">Growing</option>
            <option value="established">Established</option>
          </select>
        </div>

        <div
          className={`mt-4 ${
            tempUser.professionalInfo.hasStartup || tempUser.professionalInfo.hasStartupIdea ? "visible" : "hidden"
          }`}
        >
          <p>Tell potential cofounders what your startup is all about</p>
          <textarea
            className="mt-2 textarea w-full max-h-100"
            placeholder="Give a short overview of your product, market, and long-term goals."
            maxLength={SETTINGS.MAX_STARTUP_DESCRIPTION_LENGTH}
            value={tempUser.professionalInfo.startupDescription}
            onChange={handleStartupDescriptionChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
