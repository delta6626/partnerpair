import { Handshake } from "lucide-react";
import { RolesManager } from "./RolesManager";
import { LocationPicker } from "./LocationPicker";

export const MatchingPreferenceManager = () => {
  return (
    <div className="max-w-200 border-1 border-accent rounded-3xl p-4">
      <div className="flex items-center gap-2">
        <Handshake />
        <h1 className="text-lg">Matching Preferences</h1>
      </div>

      <div className="w-full">
        <LocationPicker />
        <RolesManager forCurrentUser={false} />
      </div>
    </div>
  );
};
