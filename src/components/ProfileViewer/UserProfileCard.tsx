import type { SuggestedProfile } from "../../../shared/types/SuggestedProfile";

export const UserProfileCard = ({ userData }: { userData: SuggestedProfile }) => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <img src={userData.user.basicInfo.profileImageUrl} className="w-15 h-15 rounded-full" />
        <h1>{userData.user.basicInfo.firstName + " " + userData.user.basicInfo.lastName}</h1>
      </div>
    </div>
  );
};
