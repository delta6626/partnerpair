import { Globe } from "lucide-react";
import { useTempUserStore } from "../../store/useTempUserStore";
import type { ChangeEvent } from "react";

export const SocialLinksManager = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  if (!tempUser) return;

  const handleLinkedInChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempUser({ ...tempUser, socialLinks: { ...tempUser.socialLinks, linkedin: e.target.value } });
  };

  const handleTwitterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempUser({ ...tempUser, socialLinks: { ...tempUser.socialLinks, twitter: e.target.value } });
  };

  const handleGithubChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempUser({ ...tempUser, socialLinks: { ...tempUser.socialLinks, github: e.target.value } });
  };

  const handleWebsiteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempUser({ ...tempUser, socialLinks: { ...tempUser.socialLinks, website: e.target.value } });
  };

  return (
    <div className="max-w-200 border border-base-100 rounded-3xl p-8">
      <div className="flex items-center gap-2">
        <Globe />
        <h1 className="text-lg font-medium">Social Profiles</h1>
      </div>

      <div className="mt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between sm:gap-12">
          <p className="text-accent">LinkedIn</p>
          <input
            type="text"
            className="mt-2 input w-full max-w-120"
            placeholder="https://www.linkedin.com/in/username"
            value={tempUser.socialLinks.linkedin}
            onChange={handleLinkedInChange}
          />
        </div>
        <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between sm:gap-12">
          <p className="text-accent">Twitter / X</p>
          <input
            type="text"
            className="mt-2 input w-full max-w-120"
            placeholder="https://x.com/username"
            value={tempUser.socialLinks.twitter}
            onChange={handleTwitterChange}
          />
        </div>
        <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between sm:gap-12">
          <p className="text-accent">GitHub</p>
          <input
            type="text"
            className="mt-2 input w-full max-w-120"
            placeholder="https://github.com/username"
            value={tempUser.socialLinks.github}
            onChange={handleGithubChange}
          />
        </div>
        <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between sm:gap-12">
          <p className="text-accent">Personal Website</p>
          <input
            type="text"
            className="mt-2 input w-full max-w-120"
            placeholder="https://yourdomain.com"
            value={tempUser.socialLinks.website}
            onChange={handleWebsiteChange}
          />
        </div>
      </div>
    </div>
  );
};
