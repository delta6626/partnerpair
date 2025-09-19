import { XIcon } from "lucide-react";
import type { UserRole } from "../../types/UserRole";
import { useTempUserStore } from "../../store/useTempUserStore";
import { SETTINGS } from "../../constants/SETTINGS";

export const RoleHolder = ({
  roleName,
  isSelector,
  forCurrentUser,
}: {
  roleName: UserRole;
  isSelector: boolean;
  forCurrentUser: boolean;
}) => {
  const { tempUser, setTempUser } = useTempUserStore();

  if (!tempUser) return;

  const handleRoleAddition = () => {
    if (forCurrentUser) {
      if (tempUser?.professionalInfo?.roles.includes(roleName)) return;
      setTempUser({
        ...tempUser,
        professionalInfo: { ...tempUser?.professionalInfo, roles: [...tempUser?.professionalInfo.roles, roleName] },
      });

      return;
    }

    if (tempUser?.matchingPreferences.lookingForRoles.includes(roleName)) return;
    setTempUser({
      ...tempUser,
      matchingPreferences: {
        ...tempUser.matchingPreferences,
        lookingForRoles: [...tempUser?.matchingPreferences.lookingForRoles, roleName],
      },
    });
  };

  const handleRoleDeletion = () => {
    if (forCurrentUser) {
      if (!tempUser?.professionalInfo?.roles.includes(roleName)) return;
      setTempUser({
        ...tempUser,
        professionalInfo: {
          ...tempUser?.professionalInfo,
          roles: tempUser?.professionalInfo.roles.filter((role) => role !== roleName),
        },
      });

      return;
    }

    if (!tempUser?.matchingPreferences.lookingForRoles.includes(roleName)) return;
    setTempUser({
      ...tempUser,
      matchingPreferences: {
        ...tempUser?.matchingPreferences,
        lookingForRoles: tempUser?.matchingPreferences.lookingForRoles.filter((role) => role !== roleName),
      },
    });
  };

  return (
    <button
      className="btn inline-flex items-center px-4 py-3 rounded-full border-1 border-accent select-none font-medium text-sm gap-2"
      onClick={handleRoleAddition}
      disabled={
        isSelector &&
        (forCurrentUser
          ? tempUser?.professionalInfo.roles.length >= SETTINGS.MAX_ROLE_COUNT
          : tempUser?.matchingPreferences.lookingForRoles.length >= SETTINGS.MAX_ROLE_COUNT)
      }
    >
      {roleName}
      {!isSelector ? (
        <div
          className="text-accent hover:text-error focus:text-error ease-in-out duration-200"
          onClick={handleRoleDeletion}
        >
          <XIcon size={20} />
        </div>
      ) : (
        ""
      )}
    </button>
  );
};
