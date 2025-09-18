import { SETTINGS } from "../../constants/SETTINGS";
import { useTempUserStore } from "../../store/useTempUserStore";
import { RoleHolder } from "./RoleHolder";
import { RoleCollection } from "./RoleCollection";

export const RolesManager = ({ forCurrentUser }: { forCurrentUser: boolean }) => {
  const { tempUser } = useTempUserStore();
  const hasRoles = forCurrentUser
    ? tempUser?.professionalInfo.roles.length != 0
    : tempUser?.matchingPreferences.lookingForRoles.length != 0;

  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <p className="">{forCurrentUser ? "Roles You Play" : "Roles You Are Looking For"}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {hasRoles && forCurrentUser ? (
          tempUser?.professionalInfo.roles.map((role) => {
            return <RoleHolder roleName={role} isSelector={false} />;
          })
        ) : hasRoles && !forCurrentUser ? (
          tempUser?.matchingPreferences.lookingForRoles.map((role) => {
            return <RoleHolder roleName={role} isSelector={false} />;
          })
        ) : (
          <p className="w-full text-accent text-center">{SETTINGS.NO_ROLES_PARAGRAPH_TEXT}</p>
        )}
      </div>
      <div tabIndex={0} className="mt-4 mb-4 collapse collapse-arrow border border-accent">
        <div className="collapse-title text-sm">Expand Roles</div>
        <div className="collapse-content">
          <RoleCollection />
        </div>
      </div>
    </>
  );
};
