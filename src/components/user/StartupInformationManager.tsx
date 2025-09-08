import { Rocket } from "lucide-react";
import { useTempUserStore } from "../../store/useTempUserStore";

export const StartupInformationManager = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  if (!tempUser) return;

  const handleUserHasStartup = () => {
    setTempUser({ ...tempUser, professionalInfo: { ...tempUser.professionalInfo, hasStartup: true } });
  };

  const handleUserDoesNotHaveStartup = () => {
    setTempUser({ ...tempUser, professionalInfo: { ...tempUser.professionalInfo, hasStartup: false } });
  };

  const handleUserHasIdea = () => {};

  const handleUserDoesNotHaveIdea = () => {};

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
                checked={tempUser?.professionalInfo.hasStartup === true ? true : false}
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
                checked={tempUser?.professionalInfo.hasStartup === true ? true : false}
                onChange={handleUserHasIdea}
              />
            </div>
            <div className="flex gap-2">
              <p>No</p>
              <input
                type="radio"
                className="radio radio-primary"
                checked={tempUser.professionalInfo.hasStartup === false}
                onChange={handleUserDoesNotHaveIdea}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
