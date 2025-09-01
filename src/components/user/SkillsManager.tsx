import { SETTINGS } from "../../constants/SETTINGS";
import { useTempUserStore } from "../../store/useTempUserStore";
import { SkillHolder } from "./SkillHolder";

export const SkillsManager = () => {
  const { tempUser } = useTempUserStore();

  if (!tempUser) {
    return;
  }

  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <p className="">Skills</p>
        <button
          className="btn btn-primary"
          disabled={tempUser.professionalInfo.skills?.length === SETTINGS.MAX_SKILL_COUNT}
        >
          {SETTINGS.ADD_SKILL_BUTTON_TEXT}
        </button>
      </div>

      <div className="mt-2">
        <div className="w-full flex flex-wrap gap-2">
          {tempUser.professionalInfo.skills?.length !== 0 ? (
            tempUser.professionalInfo.skills?.map((skill) => {
              return <SkillHolder key={skill} skillName={skill} />;
            })
          ) : (
            <p className="w-full text-center text-accent">{SETTINGS.NO_SKILLS_PARAGRAPH_TEXT}</p>
          )}
        </div>
      </div>
    </>
  );
};
