import { Handshake } from "lucide-react";
import { RolesManager } from "./RolesManager";
import { CommitmentLevelManager } from "./CommitmentLevelManager";
import { AvailabilityManager } from "./AvailabilityManager";
import { CompanyStagesManager } from "./CompanyStagesManager";
import { useTempUserStore } from "../../store/useTempUserStore";
import { SkillsManager } from "./SkillsManager";

export const MatchingPreferenceManager = () => {
  const { tempUser } = useTempUserStore();

  return (
    <div className="max-w-200 border border-base-100 rounded-3xl p-8">
      <div className="flex items-center gap-2">
        <Handshake />
        <h1 className="text-lg font-medium">Matching Preferences</h1>
      </div>

      <div className="w-full">
        <SkillsManager forCurrentUser={false} />
        <RolesManager forCurrentUser={false} />
        <CommitmentLevelManager forCurrentUser={false} />
        <AvailabilityManager forCurrentUser={false} />
        {tempUser?.professionalInfo.wantsToCofound ? <CompanyStagesManager /> : null}
      </div>
    </div>
  );
};
