import { useTempUserStore } from "../../store/useTempUserStore";

export const ProfilePhotoSelector = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 w-full">
      <img
        className="w-30 h-30 rounded-full"
        src={tempUser?.basicInfo.profileImageUrl}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
      />

      <div className="flex flex-col gap-2">
        <button className="btn">Upload photo</button>
        <button className="btn" disabled={tempUser?.basicInfo.profileImageUrl.includes(tempUser.basicInfo.firstName)}>
          Reset to default
        </button>
      </div>
    </div>
  );
};
