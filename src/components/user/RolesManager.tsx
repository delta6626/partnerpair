import { SETTINGS } from "../../constants/SETTINGS";
import { useTempUserStore } from "../../store/useTempUserStore";
import { RoleHolder } from "./RoleHolder";

export const RolesManager = () => {
  const { tempUser } = useTempUserStore();
  const hasRoles = tempUser?.professionalInfo.roles.length != 0;

  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <p className="">Roles You Play</p>
      </div>

      <div className="mt-4">
        {hasRoles ? (
          tempUser?.professionalInfo.roles.map((role) => {
            return <RoleHolder roleName={role} isSelector={false} />;
          })
        ) : (
          <p className="text-accent text-center">{SETTINGS.NO_ROLES_PARAGRAPH_TEXT}</p>
        )}
      </div>

      <hr className="text-accent mt-2" />
    </>
  );
};
