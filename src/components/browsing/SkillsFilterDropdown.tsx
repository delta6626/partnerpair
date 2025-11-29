import { ChevronDown } from "lucide-react";
import { BROWSE } from "../../../shared/constants/BROWSE";
import type { FormEvent } from "react";

export const SkillsFilterDropdown = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Skills
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2 p-4">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input className="input w-70" type="text" placeholder={BROWSE.SKILL_SEARCH_PLACEHOLDER} />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </ul>
    </div>
  );
};
