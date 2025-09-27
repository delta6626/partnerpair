import { Handshake } from "lucide-react";
import { RolesManager } from "./RolesManager";
import { LocationPicker } from "./LocationPicker";
import { CommitmentLevelManager } from "./CommitmentLevelManager";
import { AvailabilityManager } from "./AvailabilityManager";
import { CompanyStagesManager } from "./CompanyStagesManager";
import { useTempUserStore } from "../../store/useTempUserStore";
import { SkillsManager } from "./SkillsManager";

export const MatchingPreferenceManager = () => {
  const { tempUser } = useTempUserStore();

  return (
    <div className="max-w-200 border-1 border-accent rounded-3xl p-4">
      <div className="flex items-center gap-2">
        <Handshake />
        <h1 className="text-lg">Matching Preferences</h1>
      </div>

      <div className="w-full">
        <SkillsManager forCurrentUser={false} />
        <div className="mt-4 flex items-center justify-between">
          <p>Where do you want cofounders to be located?</p>
          <LocationPicker forCurrentUser={false} fullWidth={false} />
        </div>
        <RolesManager forCurrentUser={false} />
        <CommitmentLevelManager forCurrentUser={false} />
        <AvailabilityManager forCurrentUser={false} />
        {tempUser?.professionalInfo.wantsToCofound ? <CompanyStagesManager /> : null}
      </div>
    </div>
  );
};
