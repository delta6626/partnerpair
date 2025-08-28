import { useState } from "react";
import { SETTINGS } from "../../constants/SETTINGS";
import { ProfilePhotoHolder } from "./ProfilePhotoHolder";

export const ProfilePhotoSelector = ({
  currentProfilePhoto,
  setCurrentProfilePhoto,
}: {
  currentProfilePhoto: string;
  setCurrentProfilePhoto: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [profilePhotos] = useState(Object.values(SETTINGS.PROFILE_PHOTOS));

  return (
    <div className="flex flex-wrap gap-4 w-194">
      {profilePhotos.map((profilePhoto) => {
        return (
          <ProfilePhotoHolder
            profilePhoto={profilePhoto}
            currentProfilePhoto={currentProfilePhoto}
            setCurrentProfilePhoto={setCurrentProfilePhoto}
          />
        );
      })}
    </div>
  );
};
