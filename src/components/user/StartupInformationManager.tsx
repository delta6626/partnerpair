import { Rocket } from "lucide-react";
import { useTempUserStore } from "../../store/useTempUserStore";

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

  return (
    <div className="max-w-200 border-1 border-accent rounded-3xl p-4">
      <div className="flex items-center gap-2">
        <Rocket />
        <h1 className="text-lg">Statup Information</h1>
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
      </div>
    </div>
  );
};
