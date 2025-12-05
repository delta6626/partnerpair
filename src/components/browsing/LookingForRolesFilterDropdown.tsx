import { ChevronDown } from "lucide-react";

export const LookingForRolesFilterDropdown = () => {
  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Roles they seek
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-200 mt-2 p-4">
        <div className="">
          <h1 className="text-accent">Options</h1>
          <div className="flex flex-wrap gap-2 mt-2"></div>
        </div>
      </ul>
    </div>
  );
};
