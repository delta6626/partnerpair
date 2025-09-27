import { IdCard } from "lucide-react";
import { SETTINGS } from "../../constants/SETTINGS";
import { SkillsManager } from "./SkillsManager";
import { RolesManager } from "./RolesManager";
import { useTempUserStore } from "../../store/useTempUserStore";
import type { ChangeEvent } from "react";
import { CommitmentLevelManager } from "./CommitmentLevelManager";
import { AvailabilityManager } from "./AvailabilityManager";

export const ProfessionalInformationManager = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  if (!tempUser) return;

  const handleHeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempUser({
      ...tempUser,
      professionalInfo: {
        ...tempUser.professionalInfo,
        headline: e.target.value,
      },
    });
  };

  const handleBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTempUser({
      ...tempUser,
      professionalInfo: {
        ...tempUser.professionalInfo,
        headline: e.target.value,
      },
    });
  };

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
          value={tempUser?.professionalInfo.headline}
          onChange={handleHeadlineChange}
        />
      </div>

      <div className="w-full">
        <p className="mt-4">What makes you a great cofounder?</p>
        <textarea
          className="mt-2 textarea w-full max-h-100"
          placeholder="Explain your skills, experience, and vision that make you an ideal co-founder"
          maxLength={SETTINGS.MAX_BIO_LENGTH}
          value={tempUser?.professionalInfo.bio}
          onChange={handleBioChange}
        ></textarea>
      </div>

      <div className="w-full">
        <SkillsManager forCurrentUser={true} />
        <RolesManager forCurrentUser={true} />
        <CommitmentLevelManager forCurrentUser={true} />
        <AvailabilityManager forCurrentUser={true} />
      </div>
    </div>
  );
};
