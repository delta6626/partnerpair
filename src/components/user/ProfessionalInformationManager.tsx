import { IdCard } from "lucide-react";
import { SETTINGS } from "../../constants/SETTINGS";
import { SkillsManager } from "./SkillsManager";
import { RolesManager } from "./RolesManager";
import { StartupInformationManager } from "./StartupInformationManager";

export const ProfessionalInformationManager = () => {
  return (
    <div className="max-w-200 border-1 border-accent rounded-3xl p-4">
      <div className="flex items-center gap-2">
        <IdCard />
        <h1 className="text-lg">Professional Information</h1>
      </div>

      <div className="w-full">
        <p className="mt-4">Headline</p>
        <input
          type="text"
          className="mt-2 input w-full"
          placeholder="Your professional tagline or headline"
          maxLength={SETTINGS.MAX_HEADLINE_LENGTH}
        />
      </div>

      <div className="w-full">
        <p className="mt-4">Why You’d Be a Great Co-Founder</p>
        <textarea
          className="mt-2 textarea w-full max-h-100"
          placeholder="Explain your skills, experience, and vision that make you an ideal co-founder"
          maxLength={SETTINGS.MAX_BIO_LENGTH}
        ></textarea>
      </div>

      <div className="w-full">
        <SkillsManager />
        <RolesManager />
        <StartupInformationManager />
      </div>
    </div>
  );
};
