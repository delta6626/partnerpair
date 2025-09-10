import { Globe } from "lucide-react";
import { useTempUserStore } from "../../store/useTempUserStore";

export const SocialLinksManager = () => {
  const { tempUser } = useTempUserStore();

  if (!tempUser) return;

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
          />
        </div>
        <div className="mt-2 flex items-center justify-between gap-12">
          <p>Twitter / X</p>
          <input
            type="text"
            className="mt-2 input w-full max-w-120"
            placeholder="https://x.com/username"
            value={tempUser.socialLinks.twitter}
          />
        </div>
        <div className="mt-2 flex items-center justify-between gap-12">
          <p>GitHub</p>
          <input
            type="text"
            className="mt-2 input w-full max-w-120"
            placeholder="https://github.com/username"
            value={tempUser.socialLinks.github}
          />
        </div>
        <div className="mt-2 flex items-center justify-between gap-12">
          <p>Personal Website</p>
          <input
            type="text"
            className="mt-2 input w-full max-w-120"
            placeholder="https://yourdomain.com"
            value={tempUser.socialLinks.website}
          />
        </div>
      </div>
    </div>
  );
};
