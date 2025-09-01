import { useTempUserStore } from "../../store/useTempUserStore";
import { SkillHolder } from "./SkillHolder";

export const SkillsManager = () => {
  const { tempUser } = useTempUserStore();

  if (!tempUser) {
    return;
  }

  return (
    <div className="w-full flex flex-wrap">
      {tempUser?.professionalInfo.skills?.map((skill, id) => {
        return <SkillHolder key={id} skillName={skill} />;
      })}
    </div>
  );
};
