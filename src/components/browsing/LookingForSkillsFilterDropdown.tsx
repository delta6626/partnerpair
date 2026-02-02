import { ChevronDown, XIcon } from "lucide-react";
import { BROWSE } from "../../../shared/constants/BROWSE";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { SETTINGS } from "../../../shared/constants/SETTINGS";
import { GenericChip } from "../ProfileViewer/GenericChip";
import { titleString } from "../../../shared/utils/titleString";

export const LookingForSkillsFilterDropDown = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const skillsSought = searchParams.get(BROWSE.PARAM_SKILLS_SOUGHT)?.split(",") ?? [];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (skillsSought.length >= SETTINGS.MAX_SKILL_COUNT) return;

    const skillInput = e.currentTarget.querySelector("input") as HTMLInputElement;
    const skill = skillInput.value.trim().toLowerCase();

    if (!skill) return;
    const updatedSkillsSought = skillsSought.includes(skill) ? skillsSought : [...skillsSought, skill];
    searchParams.set(BROWSE.PARAM_SKILLS_SOUGHT, updatedSkillsSought.join(","));
    setSearchParams(searchParams);
    skillInput.value = "";
  };

  const handleSkillDelete = (skillToDelete: string) => {
    const updatedSkillsSought = skillsSought.filter((skill) => skill !== skillToDelete);

    if (updatedSkillsSought.length > 0) {
      searchParams.set(BROWSE.PARAM_SKILLS_SOUGHT, updatedSkillsSought.join(","));
    } else {
      searchParams.delete(BROWSE.PARAM_SKILLS_SOUGHT);
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="dropdown dropdown-end xl:dropdown-start">
      <button tabIndex={0} role="button" className="btn w-full flex justify-between">
        Skills they seek
        <ChevronDown size={20} />
      </button>

      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2 p-4">
        <div className="">
          {skillsSought.length > 0 && <h1 className="text-accent">Added</h1>}
          {skillsSought.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 mt-2">
              {skillsSought.map((skill) => {
                return (
                  <GenericChip
                    chipText={titleString(skill)}
                    key={`selected-${skill}`}
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
