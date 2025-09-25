import type { UserPreferredCompanyStage } from "../../types/UserPreferredCompanyStage";

export const CompanyStagesManager = () => {
  const possibleStages: UserPreferredCompanyStage[] = [
    "Idea",
    "Building MVP",
    "Just Launched",
    "Growing",
    "Established",
  ];

  return (
    <div className="w-full flex items-center justify-between">
      <p></p>
      <select className="select max-w-45">
        <option value={""} disabled>
          Select an option
        </option>
      </select>
    </div>
  );
};
