import { ChevronDown } from "lucide-react";

export const StartupFilterDropdown = () => {
  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Startup Preferences
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 w-100 rounded-box z-1 mt-2 p-4">
        <div className="">
          <div className="flex items-center justify-between">
            <h1>Show users with startups</h1>
            <input type="radio" className="radio" />
          </div>
        </div>
      </ul>
    </div>
  );
};
