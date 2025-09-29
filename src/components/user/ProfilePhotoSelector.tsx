import { useState } from "react";
import { SETTINGS } from "../../constants/SETTINGS";
import { ProfilePhotoHolder } from "./ProfilePhotoHolder";

export const ProfilePhotoSelector = () => {
  const [profilePhotos] = useState(Object.values(SETTINGS.PROFILE_PHOTOS));

  return (
    <div className="flex flex-wrap gap-4 w-full">
      {profilePhotos.map((profilePhoto) => {
        return <ProfilePhotoHolder key={profilePhoto} profilePhoto={profilePhoto} />;
      })}
    </div>
  );
};
