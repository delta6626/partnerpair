import { ChevronDown } from "lucide-react";

export const StartupFilterDropdown = () => {
  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Startup Preferences
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2 p-4"></ul>
    </div>
  );
};
