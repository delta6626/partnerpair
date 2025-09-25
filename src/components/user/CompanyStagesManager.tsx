import { useState } from "react";
import { useTempUserStore } from "../../store/useTempUserStore";
import type { UserPreferredCompanyStage } from "../../types/UserPreferredCompanyStage";
import { SETTINGS } from "../../constants/SETTINGS";

export const CompanyStagesManager = () => {
  const { tempUser, setTempUser } = useTempUserStore();
  const [collapseOpen, setCollapseOpen] = useState<boolean>(false);

  const possibleStages: UserPreferredCompanyStage[] = [
    "Idea",
    "Building MVP",
    "Just Launched",
    "Growing",
    "Established",
  ];

  const handleCollapseClick = () => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <div className="w-full mt-4">
      <p>Preferred Company Stages</p>

      <div className="">
        {tempUser?.matchingPreferences.preferredCompanyStage.length != 0 ? (
          tempUser?.matchingPreferences.preferredCompanyStage.map((companyStage) => {
            return (
              <button
                key={companyStage}
                className="btn inline-flex items-center px-4 py-3 rounded-full border-1 border-accent select-none font-medium text-sm gap-2"
              >
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

      <div
        tabIndex={0}
        className={`mt-2 collapse collapse-arrow ${
          collapseOpen ? "collapse-open" : "collapse-close"
        } border border-accent`}
      >
        <div className="collapse-title text-sm" onClick={handleCollapseClick}>
          View All Stages
        </div>
        <div className="collapse-content">
          <div className="flex flex-wrap gap-2">
            {possibleStages.map((stage) => {
              return (
                <button
                  className="btn inline-flex items-center px-4 py-3 rounded-full border-1 border-accent select-none font-medium text-sm gap-2"
                  key={stage}
                  disabled={
                    tempUser?.matchingPreferences.preferredCompanyStage.length === SETTINGS.MAX_COMPANY_STAGES_LENGTH
                  }
                >
                  {stage}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
