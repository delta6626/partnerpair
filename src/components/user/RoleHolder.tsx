import { XIcon } from "lucide-react";
import type { UserRole } from "../../types/UserRole";

export const RoleHolder = ({ roleName, isSelector }: { roleName: UserRole; isSelector: boolean }) => {
  const handleRoleAddition = () => {};
  const handleRoleDeletion = () => {};

  return (
    <div
      className="inline-flex items-center px-4 py-3 rounded-full bg-base-300 border-1 border-accent select-none font-medium text-sm gap-2 hover:bg-base-200"
      onClick={handleRoleAddition}
    >
      {roleName}
      {!isSelector ? (
        <button
          className="text-accent hover:text-error focus:text-error ease-in-out duration-200"
          onClick={handleRoleDeletion}
        >
          <XIcon size={20} />
        </button>
      ) : (
        ""
      )}
    </div>
  );
};
