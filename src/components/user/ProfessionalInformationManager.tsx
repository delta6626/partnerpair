import { IdCard } from "lucide-react";
import { SETTINGS } from "../../constants/SETTINGS";
import { SkillsManager } from "./SkillsManager";

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
        <p className="mt-4">Bio</p>
        <textarea
          className="mt-2 textarea w-full"
          placeholder="Your background, skills, or interests"
          maxLength={SETTINGS.MAX_BIO_LENGTH}
        ></textarea>
      </div>

      <div className="w-full">
        <div className="mt-4 flex items-center justify-between">
          <p className="">Skills</p>
          <button className="btn btn-primary">{SETTINGS.ADD_SKILL_BUTTON_TEXT}</button>
        </div>
        <div className="mt-2">
          <SkillsManager />
        </div>
      </div>
    </div>
  );
};
