export const SkillHolder = ({ skillName }: { skillName: string }) => {
  return (
    <div className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-base-200 font-semibold text-sm">
      {skillName}
    </div>
  );
};
