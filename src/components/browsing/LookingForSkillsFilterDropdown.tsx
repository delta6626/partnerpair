import { ChevronDown } from "lucide-react";
import { BROWSE } from "../../../shared/constants/BROWSE";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { SETTINGS } from "../../../shared/constants/SETTINGS";

export const LookingForSkillsFilterDropDown = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const skillsSought = searchParams.get("skillsSought")?.split(",") ?? [];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (skillsSought.length >= SETTINGS.MAX_SKILL_COUNT) return;

    const skillInput = e.currentTarget.querySelector("input") as HTMLInputElement;
    const skill = skillInput.value.trim().toLowerCase();

    if (!skill) return;
    const updatedSkillsSought = skillsSought.includes(skill) ? skillsSought : [...skillsSought, skill];
    searchParams.set("skillsSought", updatedSkillsSought.join(","));
    setSearchParams(searchParams);
    skillInput.value = "";
  };

  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Skills they seek
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2 p-4">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input className="input w-100" type="text" placeholder={BROWSE.LOOKING_FOR_SKILL_SEARCH_PLACEHOLDER} />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </ul>
    </div>
  );
};
