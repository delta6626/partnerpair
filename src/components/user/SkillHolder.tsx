import { XIcon } from "lucide-react";
import { useTempUserStore } from "../../store/useTempUserStore";

export const SkillHolder = ({ skillName, forCurrentUser }: { skillName: string; forCurrentUser: boolean }) => {
  const { tempUser, setTempUser } = useTempUserStore();

  if (!tempUser) return null;

  const skills = forCurrentUser
    ? tempUser.professionalInfo.skills ?? []
    : tempUser.matchingPreferences.lookingForSkills ?? [];

  const handleSkillDeletion = () => {
    const updatedSkills = skills.filter((skill) => skill !== skillName);

    setTempUser(
      forCurrentUser
        ? {
            ...tempUser,
            professionalInfo: {
              ...tempUser.professionalInfo,
              skills: updatedSkills,
            },
          }
        : {
            ...tempUser,
            matchingPreferences: {
              ...tempUser.matchingPreferences,
              lookingForSkills: updatedSkills,
            },
          }
    );
  };

  return (
    <div className="btn inline-flex items-center px-4 py-3 rounded-full border-1 border-accent select-none font-medium text-sm gap-2">
      {skillName}
      <button
        className="text-accent hover:text-error focus:text-error ease-in-out duration-200"
        onClick={handleSkillDeletion}
      >
        <XIcon size={20} />
      </button>
    </div>
  );
};
