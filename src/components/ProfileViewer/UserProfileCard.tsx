import type { SuggestedProfile } from "../../../shared/types/SuggestedProfile";

export const UserProfileCard = ({ userData }: { userData: SuggestedProfile }) => {
  return (
    <div className="p-4 bg-base-200 min-w-105 rounded-3xl">
      <div className="flex items-center gap-4">
        <img src={userData.profileImageURL} className="w-15 h-15 rounded-full" />
        <div className="w-full flex items-center justify-between">
          <div className="">
            <h1>{userData.firstName + " " + userData.lastName}</h1>
            <p className="text-accent w-full max-w-70 truncate">{userData.headline}</p>
          </div>
          <p>Score label</p>
        </div>
      </div>
    </div>
  );
};
