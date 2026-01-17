import type { SuggestedProfile } from "../../../shared/types/SuggestedProfile";
import { AddContact } from "../user/AddContact";
import { Link } from "react-router-dom";
import { GenericChipCollection } from "./GenericChipCollection";
import { ProBadge } from "../user/ProBadge";
import type { FilteredUser } from "../../../shared/types/FilteredProfile";

export const UserProfileCard = ({ userData }: { userData: SuggestedProfile | FilteredUser }) => {
  return (
    <div className="break-inside-avoid p-4 border border-base-100 bg-base-200 min-w-105 rounded-3xl">
      <div className="flex items-center gap-4">
        <div className="h-15 w-15 flex items-center">
          <Link to={`/user/${userData.id}`} className="h-15 w-15">
            <img src={userData.profileImageURL} className="h-15 w-15 rounded-full" />
          </Link>
        </div>
        <div className="w-full flex gap-4 items-center justify-between">
          <div className="">
            <div className="flex items-center gap-2">
              <Link to={`/user/${userData.id}`}>
                <h1>{userData.firstName + " " + userData.lastName}</h1>
              </Link>
              {userData.tier === "Pro" && <ProBadge />}
            </div>
            <p className="text-accent">{userData.headline ?? "---"}</p>
          </div>

          <div className="min-w-fit">
            <AddContact buttonType={"icon"} contactId={userData.id} />
          </div>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-accent">Bio</p>
        <h1>{userData.bio}</h1>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <p className="text-accent">Roles I Play</p>
        <GenericChipCollection
          listItems={userData.roles}
          fallbackText={userData.firstName + " has not added any roles yet."}
        />
      </div>

      <div className="mt-2">
        <p className="text-accent">{userData.wantsToCofound ? "Looking to Cofound" : "My Startup"}</p>
        <h1>
          {userData.wantsToCofound
            ? "I want to join someone else's startup as a cofounder."
            : userData.startupDescription}
        </h1>
      </div>
    </div>
  );
};
