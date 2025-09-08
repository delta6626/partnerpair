import { Rocket } from "lucide-react";

export const StartupInformationManager = () => {
  return (
    <div className="max-w-200 border-1 border-accent rounded-3xl p-4">
      <div className="flex items-center gap-2">
        <Rocket />
        <h1 className="text-lg">Statup Information</h1>
      </div>
    </div>
  );
};
