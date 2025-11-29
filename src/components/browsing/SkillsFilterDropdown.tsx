import { ChevronDown } from "lucide-react";
import { BROWSE } from "../../../shared/constants/BROWSE";

export const SkillsFilterDropdown = () => {
  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Skills
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2 p-4">
        <form className="flex gap-2">
          <input className="input w-70" type="text" placeholder={BROWSE.SKILL_SEARCH_PLACEHOLDER} />
          <button className="btn btn-primary">Add</button>
        </form>
      </ul>
    </div>
  );
};
