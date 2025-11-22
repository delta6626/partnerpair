import { CircleStar } from "lucide-react";
import type { SuggestedProfile } from "../../../shared/types/SuggestedProfile";
import { AddContact } from "../user/AddContact";
import { Link } from "react-router-dom";

export const UserProfileCard = ({ userData }: { userData: SuggestedProfile }) => {
  return (
    <div className="p-4 border border-accent min-w-105 rounded-3xl">
      <div className="flex items-center gap-4">
        <div className="h-15 w-15 flex items-center">
          <Link to={`/user/${userData.id}`} className="h-15 w-15">
            <img src={userData.profileImageURL} className="rounded-full" />
          </Link>
        </div>
        <div className="w-full flex gap-4 items-center justify-between">
          <div className="">
            <div className="flex items-center gap-2">
              <Link to={`/user/${userData.id}`}>
                <h1>{userData.firstName + " " + userData.lastName}</h1>
              </Link>
              {userData.tier === "Pro" && (
                <div className="tooltip tooltip-top tooltip-primary" data-tip={"Pro user"}>
                  <CircleStar className="text-primary" size={20} />
                </div>
              )}
            </div>
            <p className="text-accent">{userData.headline}</p>
          </div>

          <div className="min-w-fit">
            <AddContact buttonType={"icon"} contactId={userData.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
