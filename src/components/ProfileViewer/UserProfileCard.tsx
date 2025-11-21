import { CircleStar } from "lucide-react";
import type { SuggestedProfile } from "../../../shared/types/SuggestedProfile";
import { AddContact } from "../user/AddContact";
import { Link, useNavigate } from "react-router-dom";

export const UserProfileCard = ({ userData }: { userData: SuggestedProfile }) => {
  const navigate = useNavigate();

  const viewUserProfile = () => {
    navigate(`/user/${userData.id}`);
  };

  return (
    <div className="p-4 border border-accent min-w-105 rounded-3xl flex flex-col justify-between">
      <div className="flex items-center gap-4">
        <div className="h-15 w-15 flex items-center">
          <Link to={`/user/${userData.id}`} className="h-15 w-15">
            <img src={userData.profileImageURL} className="rounded-full" />
          </Link>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="">
            <div className="flex items-center gap-2">
              <h1 className="cursor-pointer" onClick={viewUserProfile}>
                {userData.firstName + " " + userData.lastName}
              </h1>
              {userData.tier === "Pro" && (
                <div className="tooltip tooltip-top tooltip-primary" data-tip={"Pro user"}>
                  <CircleStar className="text-primary" size={20} />
                </div>
              )}
            </div>
            <p className="text-accent w-full max-w-70 truncate">{userData.headline}</p>
          </div>

          <div className="">
            <AddContact contactId={userData.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
