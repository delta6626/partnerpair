import { useTempUserStore } from "../../store/useTempUserStore";
import type { UserPreferredCompanyStage } from "../../types/UserPreferredCompanyStage";

export const CompanyStagesManager = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  const possibleStages: UserPreferredCompanyStage[] = [
    "Idea",
    "Building MVP",
    "Just Launched",
    "Growing",
    "Established",
  ];

  return (
    <div className="w-full mt-4">
      <p>Preferred Company Stages</p>

      <div className="">
        {tempUser?.matchingPreferences.preferredCompanyStage.length != 0 ? (
          tempUser?.matchingPreferences.preferredCompanyStage.map((companyStage) => {
            return (
              <button className="btn inline-flex items-center px-4 py-3 rounded-full border-1 border-accent select-none font-medium text-sm gap-2">
                {companyStage}
              </button>
            );
          })
        ) : (
          <div className="w-full text-center text-accent mt-2">
            <p>Choose your preferred startup stages.</p>
          </div>
        )}
      </div>
    </div>
  );
};
