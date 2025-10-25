import { CircleStar, Clock, MapPin, Phone, Zap } from "lucide-react";
import type { DisplayableUserBasic } from "../../../shared/types/DisplayableUserBasic";
import { PROFILE_VIEWER } from "../../../shared/constants/PROFILE_VIEWER";

export const RenderBasicData = ({ visitedUserData }: { visitedUserData: DisplayableUserBasic }) => {
  return (
    <div className="w-full max-w-200 border-1 border-accent rounded-3xl p-8">
      <div className="flex gap-4">
        <div className="min-w-36">
          <img src={visitedUserData.basicInfo.profileImageUrl} className="w-36 h-36 rounded-full" />
        </div>

        <div className="w-full">
          <div className="flex justify-between">
            <div className="">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-medium">
                  {visitedUserData.basicInfo.firstName + " " + visitedUserData.basicInfo.lastName}
                </h1>
                {visitedUserData.basicInfo.tier === "Pro" ? (
                  <div className="tooltip tooltip-top tooltip-primary" data-tip={"Pro user"}>
                    <CircleStar className="text-primary" size={20} />
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="">
                <p className="text-accent">{visitedUserData.professionalInfo.headline}</p>
              </div>

              <div className="flex gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  <p className="flex gap-2">
                    <MapPin size={20} className="text-accent" /> {visitedUserData.basicInfo.location}
                  </p>
                  <p className="flex gap-2">
                    <Clock size={20} className="text-accent" /> {PROFILE_VIEWER.PRO_ONLY}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="flex gap-2">
                    <Phone size={20} className="text-accent" /> {PROFILE_VIEWER.PRO_ONLY}
                  </p>
                  <p className="flex gap-2">
                    <Zap size={20} className="text-accent" /> {PROFILE_VIEWER.PRO_ONLY}
                  </p>
                </div>
              </div>
            </div>

            <div className="">
              <button className={`btn ${!visitedUserData.basicInfo.addedToContactList ? "btn-primary" : "btn-error"}`}>
                {!visitedUserData.basicInfo.addedToContactList
                  ? PROFILE_VIEWER.ADD_CONTACT
                  : PROFILE_VIEWER.REMOVE_CONTACT}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
