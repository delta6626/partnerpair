import { SETTINGS } from "../../constants/SETTINGS";
import { useTempUserStore } from "../../store/useTempUserStore";
import { SkillHolder } from "./SkillHolder";

export const SkillsManager = () => {
  const { tempUser } = useTempUserStore();

  if (!tempUser) {
    return;
  }

  return (
    <div className="w-full flex flex-wrap">
      {tempUser.professionalInfo.skills?.length !== 0 ? (
        tempUser.professionalInfo.skills?.map((skill, id) => {
          return <SkillHolder key={id} skillName={skill} />;
        })
      ) : (
        <p className="w-full text-center text-accent">{SETTINGS.NO_SKILLS_PARAGRAPH_TEXT}</p>
      )}
    </div>
  );
};
