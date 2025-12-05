import { ChevronDown } from "lucide-react";
import { BROWSE } from "../../../shared/constants/BROWSE";

export const LookingForSkillsFilterDropDown = () => {
  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Skills they seek
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2 p-4">
        <form className="flex gap-2">
          <input className="input w-100" type="text" placeholder={BROWSE.LOOKING_FOR_SKILL_SEARCH_PLACEHOLDER} />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </ul>
    </div>
  );
};
