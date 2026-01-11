import { useTempUserStore } from "../../store/useTempUserStore";

export const ProfilePhotoSelector = () => {
  const { tempUser, setTempUser } = useTempUserStore();

  return (
    <div className="flex flex-wrap gap-4 w-full">
      <img
        className="w-30 h-30 rounded-full"
        src={tempUser?.basicInfo.profileImageUrl}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
      />
    </div>
  );
};
