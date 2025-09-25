import { SETTINGS } from "../../constants/SETTINGS";
import { useTempUserStore } from "../../store/useTempUserStore";
import { RoleHolder } from "./RoleHolder";
import { RoleCollection } from "./RoleCollection";
import { useState } from "react";

export const RolesManager = ({ forCurrentUser }: { forCurrentUser: boolean }) => {
  const { tempUser } = useTempUserStore();
  const [collapseOpen, setCollapseOpen] = useState<boolean>(false);
  const hasRoles = forCurrentUser
    ? tempUser?.professionalInfo.roles.length != 0
    : tempUser?.matchingPreferences.lookingForRoles.length != 0;

  const handleCollapseClick = () => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <>
      <div className="mt-4">
        <p>{forCurrentUser ? "Roles You Play" : "Preferred Cofounder Roles"}</p>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {hasRoles && forCurrentUser ? (
          tempUser?.professionalInfo.roles.map((role) => {
            return <RoleHolder roleName={role} isSelector={false} forCurrentUser={true} />;
          })
        ) : hasRoles && !forCurrentUser ? (
          tempUser?.matchingPreferences.lookingForRoles.map((role) => {
            return <RoleHolder roleName={role} isSelector={false} forCurrentUser={false} />;
          })
        ) : (
          <p className="w-full text-accent text-center">{SETTINGS.NO_ROLES_PARAGRAPH_TEXT}</p>
        )}
      </div>

      <div
        tabIndex={0}
        className={`mt-2 collapse collapse-arrow ${
          collapseOpen ? "collapse-open" : "collapse-close"
        } border border-accent`}
      >
        <div className="collapse-title text-sm" onClick={handleCollapseClick}>
          View all roles
        </div>
        <div className="collapse-content">
          <RoleCollection forCurrentUser={forCurrentUser} />
        </div>
      </div>
    </>
  );
};
