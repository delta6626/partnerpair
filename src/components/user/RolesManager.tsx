import { SETTINGS } from "../../constants/SETTINGS";
import { useTempUserStore } from "../../store/useTempUserStore";
import { RoleHolder } from "./RoleHolder";
import { RoleCollection } from "./RoleCollection";

export const RolesManager = () => {
  const { tempUser } = useTempUserStore();
  const hasRoles = tempUser?.professionalInfo.roles.length != 0;

  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <p className="">Roles You Play</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {hasRoles ? (
          tempUser?.professionalInfo.roles.map((role) => {
            return <RoleHolder roleName={role} isSelector={false} />;
          })
        ) : (
          <p className="w-full text-accent text-center">{SETTINGS.NO_ROLES_PARAGRAPH_TEXT}</p>
        )}
      </div>
      <hr className="text-accent mt-4 mb-4" />
      <div tabIndex={0} className="collapse collapse-arrow border border-accent">
        <div className="collapse-title">Expand Roles</div>
        <div className="collapse-content">
          <RoleCollection />
        </div>
      </div>
    </>
  );
};
