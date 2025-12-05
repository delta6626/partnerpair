import { ChevronDown, XIcon } from "lucide-react";
import { BROWSE } from "../../../shared/constants/BROWSE";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { GenericChip } from "../ProfileViewer/GenericChip";
import { titleString } from "../../../shared/utils/titleString";
import { SETTINGS } from "../../../shared/constants/SETTINGS";

export const SkillsFilterDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const skills = searchParams.get("skills")?.split(",") ?? [];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (skills.length >= SETTINGS.MAX_SKILL_COUNT) return;

    const skillInput = e.currentTarget.querySelector("input") as HTMLInputElement;
    const skill = skillInput.value.trim().toLowerCase();

    if (!skill) return;
    const updatedSkills = skills.includes(skill) ? skills : [...skills, skill];
    searchParams.set("skills", updatedSkills.join(","));
    setSearchParams(searchParams);
    skillInput.value = "";
  };

  const handleSkillDelete = (skillToDelete: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToDelete);
    if (updatedSkills.length > 0) {
      searchParams.set("skills", updatedSkills.join(","));
    } else {
      searchParams.delete("skills");
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn">
        Skills
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2 p-4">
        <div className="">
          {skills.length > 0 && <h1 className="text-accent">Added</h1>}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 mt-2">
              {skills.map((skill) => {
                return (
                  <GenericChip
                    chipText={titleString(skill)}
                    key={`selected-${skill}`}
                    fallbackText=""
                    onClick={() => {
                      handleSkillDelete(skill);
                    }}
                  >
                    <XIcon size={20} className="hover:text-error focus:text-error ease-in-out duration-200" />
                  </GenericChip>
                );
              })}
            </div>
          )}
        </div>

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
