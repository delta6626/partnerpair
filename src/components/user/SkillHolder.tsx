import { XIcon } from "lucide-react";

export const SkillHolder = ({ skillName }: { skillName: string }) => {
  const handleSkillDeletion = () => {};

  return (
    <div className="inline-flex items-center px-4 py-3 rounded-full bg-base-200 font-medium text-sm gap-2">
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
