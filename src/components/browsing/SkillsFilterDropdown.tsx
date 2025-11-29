import { ChevronDown, XIcon } from "lucide-react";
import { BROWSE } from "../../../shared/constants/BROWSE";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { GenericChip } from "../ProfileViewer/GenericChip";

export const SkillsFilterDropdown = () => {
  const [searchParams, getSearchParams] = useSearchParams();

  const skills = searchParams.get("skills")?.split(",") ?? [];

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
        <div className="">
          {skills.length > 0
            ? skills.map((skill) => {
                return (
                  <GenericChip chipText={skill.toLocaleUpperCase()} fallbackText="">
                    <XIcon size={20} />
                  </GenericChip>
                );
              })
            : ""}
        </div>

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
