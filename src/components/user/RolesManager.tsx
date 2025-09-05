import { SETTINGS } from "../../constants/SETTINGS";
import { useTempUserStore } from "../../store/useTempUserStore";

export const RolesManager = () => {
  const { tempUser } = useTempUserStore();

  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="">Roles You Play</p>
      <button
        className="btn btn-primary"
        disabled={tempUser?.professionalInfo.roles.length === SETTINGS.MAX_ROLE_COUNT}
      >
        Add roles
      </button>
    </div>
  );
};
