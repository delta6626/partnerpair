import type { UserPreferredCompanyStage } from "../../types/UserPreferredCompanyStage";

export const CompanyStageManager = ({ forCurrentUser }: { forCurrentUser: boolean }) => {
  const possibleStages: UserPreferredCompanyStage[] = [
    "Idea",
    "Building MVP",
    "Just Launched",
    "Growing",
    "Established",
  ];

  return (
    <div className="w-full flex items-center justify-between">
      <p>{forCurrentUser ? "What stage is your startup in?" : "Preferred company stage"}</p>
      <select className="select max-w-45"></select>
    </div>
  );
};
