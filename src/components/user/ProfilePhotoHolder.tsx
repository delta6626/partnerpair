import { useTempUserStore } from "../../store/useTempUserStore";

export const ProfilePhotoHolder = ({ profilePhoto }: { profilePhoto: string }) => {
  const { tempUser, setTempUser } = useTempUserStore();

  if (!tempUser) return;

  const handleProfilePhotoClick = () => {
    setTempUser({ ...tempUser, basicInfo: { ...tempUser?.basicInfo, profileImageUrl: profilePhoto } });
    console.log(tempUser);
  };

  return (
    <div className="">
      <div className="relative w-12 h-12" onClick={handleProfilePhotoClick}>
        <img
          className={`w-12 h-12 rounded-full ${
            profilePhoto === tempUser?.basicInfo.profileImageUrl ? "outline-2 outline-primary" : ""
          }`}
          src={profilePhoto}
        />
      </div>
    </div>
  );
};
