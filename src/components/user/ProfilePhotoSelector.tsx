import { SETTINGS } from "../../../shared/constants/SETTINGS";
import { useTempUserStore } from "../../store/useTempUserStore";

export const ProfilePhotoSelector = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  if (!tempUser) return;

  const handleProfileImageURLReset = () => {
    setTempUser({
      ...tempUser,
      basicInfo: {
        ...tempUser.basicInfo,
        profileImageUrl: `${SETTINGS.DICEBEAR_API_URL}${tempUser.basicInfo.firstName}`,
      },
    });
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 w-full">
      <img
        className="w-30 h-30 rounded-full"
        src={tempUser?.basicInfo.profileImageUrl}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
      />

      <div className="flex flex-col gap-2">
        <input
          type="file"
          className="file-input file-input-primary"
          accept="image/png, image/jpeg, image/jpg, image/webp"
        ></input>

        <button
          className="btn"
          disabled={tempUser?.basicInfo.profileImageUrl.includes(tempUser.basicInfo.firstName)}
          onClick={handleProfileImageURLReset}
        >
          Reset to default
        </button>
      </div>
    </div>
  );
};
