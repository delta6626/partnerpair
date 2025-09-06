import { XIcon } from "lucide-react";
import { useTempUserStore } from "../../store/useTempUserStore";

export const SkillHolder = ({ skillName }: { skillName: string }) => {
  const { tempUser, setTempUser } = useTempUserStore();

  if (!tempUser) {
    return;
  }

  const handleSkillDeletion = () => {
    const filteredSkills = tempUser.professionalInfo.skills.filter((skill) => skill != skillName);
    setTempUser({ ...tempUser, professionalInfo: { ...tempUser.professionalInfo, skills: filteredSkills } });
  };

  return (
    <div className="btn inline-flex items-center px-4 py-3 rounded-full border-1 border-accent select-none font-medium text-sm gap-2">
      {skillName}
      <button
        className="text-accent hover:text-error focus:text-error ease-in-out duration-200"
        onClick={handleSkillDeletion}
      >
        <XIcon className="" size={20} />
      </button>
    </div>
  );
};
