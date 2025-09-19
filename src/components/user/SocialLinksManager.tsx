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
    <div className="max-w-200 border-1 border-accent rounded-3xl p-4">
      <div className="flex items-center gap-2">
        <Globe />
        <h1 className="text-lg">Social Profiles</h1>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-12">
          <p>LinkedIn</p>
          <input
            type="text"
            className="mt-2 input w-full max-w-120"
            placeholder="https://www.linkedin.com/in/username"
            value={tempUser.socialLinks.linkedin}
            onChange={handleLinkedInChange}
          />
        </div>
        <div className="mt-2 flex items-center justify-between gap-12">
          <p>Twitter / X</p>
          <input
            type="text"
            className="mt-2 input w-full max-w-120"
            placeholder="https://x.com/username"
            value={tempUser.socialLinks.twitter}
            onChange={handleTwitterChange}
          />
        </div>
        <div className="mt-2 flex items-center justify-between gap-12">
          <p>GitHub</p>
          <input
            type="text"
            className="mt-2 input w-full max-w-120"
            placeholder="https://github.com/username"
            value={tempUser.socialLinks.github}
            onChange={handleGithubChange}
          />
        </div>
        <div className="mt-2 flex items-center justify-between gap-12">
          <p>Personal Website</p>
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
