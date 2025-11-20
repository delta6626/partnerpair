import { CircleStar } from "lucide-react";
import type { SuggestedProfile } from "../../../shared/types/SuggestedProfile";
import { GenericChipCollection } from "./GenericChipCollection";
import { AddContact } from "../user/AddContact";

export const UserProfileCard = ({ userData }: { userData: SuggestedProfile }) => {
  return (
    <div className="p-4 bg-base-200 min-w-105 rounded-3xl flex flex-col justify-between">
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

      <div className="mt-4">
        <GenericChipCollection
          listItems={userData.roles}
          fallbackText={userData.firstName + " has not added any roles yet."}
        />

        <h1 className="mt-4 text-accent">{userData.bio}</h1>
      </div>

      <div className="mt-4">
        <AddContact contactId={userData.id} />
      </div>
    </div>
  );
};
