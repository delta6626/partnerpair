import type { SuggestedProfile } from "../../../shared/types/SuggestedProfile";

export const UserProfileCard = ({ userData }: { userData: SuggestedProfile }) => {
  return (
    <div className="p-4">
      <div className="">
        <img src={userData.user.basicInfo.profileImageUrl} className="w-15 h-15 rounded-full" />
      </div>
    </div>
  );
};
