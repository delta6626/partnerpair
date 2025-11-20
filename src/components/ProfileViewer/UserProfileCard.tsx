import { CircleStar } from "lucide-react";
import type { SuggestedProfile } from "../../../shared/types/SuggestedProfile";

export const UserProfileCard = ({ userData }: { userData: SuggestedProfile }) => {
  return (
    <div className="p-4 bg-base-200 min-w-105 rounded-3xl">
      <div className="flex items-center gap-4">
        <img src={userData.profileImageURL} className="w-15 h-15 rounded-full" />
        <div className="">
          <div className="flex items-center gap-2">
            <h1>{userData.firstName + " " + userData.lastName}</h1>
            {userData.tier === "Pro" && (
              <div className="tooltip tooltip-top tooltip-primary" data-tip={"Pro user"}>
                <CircleStar className="text-primary" size={20} />
              </div>
            )}
          </div>
          <p className="text-accent w-full max-w-70 truncate">{userData.headline}</p>
        </div>
      </div>
    </div>
  );
};
