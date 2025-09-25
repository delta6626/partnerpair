import type { UserPreferredCompanyStage } from "../../types/UserPreferredCompanyStage";

export const CompanyStageManager = ({ forCurrentUser }: { forCurrentUser: boolean }) => {
  const possibleStages: UserPreferredCompanyStage[] = [
    "Idea",
    "Building MVP",
    "Just Launched",
    "Growing",
    "Established",
  ];

  return <div className=""></div>;
};
