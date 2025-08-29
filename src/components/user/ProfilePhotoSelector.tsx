import { useState } from "react";
import { SETTINGS } from "../../constants/SETTINGS";
import { ProfilePhotoHolder } from "./ProfilePhotoHolder";

export const ProfilePhotoSelector = () => {
  const [profilePhotos] = useState(Object.values(SETTINGS.PROFILE_PHOTOS));

  return (
    <div className="flex flex-wrap gap-4 w-194">
      {profilePhotos.map((profilePhoto) => {
        return <ProfilePhotoHolder profilePhoto={profilePhoto} />;
      })}
    </div>
  );
};
