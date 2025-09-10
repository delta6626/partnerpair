import { Globe } from "lucide-react";

export const SocialLinksManager = () => {
  return (
    <div className="max-w-200 border-1 border-accent rounded-3xl p-4">
      <div className="flex items-center gap-2">
        <Globe />
        <h1 className="text-lg">Social Profiles</h1>
      </div>
    </div>
  );
};
