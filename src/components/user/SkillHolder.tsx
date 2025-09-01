export const SkillHolder = ({ skillName }: { skillName: string }) => {
  return (
    <div className="inline-flex items-center px-4 py-2 rounded-full bg-base-200 font-medium text-sm">{skillName}</div>
  );
};
