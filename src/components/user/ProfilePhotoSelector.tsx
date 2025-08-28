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
  const [profilePhotos] = useState([
    SETTINGS.PROFILE_PHOTOS.DEFAULT_PROFILE_PHOTO,
    SETTINGS.PROFILE_PHOTOS.PROFILE_PHOTO_1,
    SETTINGS.PROFILE_PHOTOS.PROFILE_PHOTO_2,
    SETTINGS.PROFILE_PHOTOS.PROFILE_PHOTO_3,
    SETTINGS.PROFILE_PHOTOS.PROFILE_PHOTO_4,
    SETTINGS.PROFILE_PHOTOS.PROFILE_PHOTO_5,
    SETTINGS.PROFILE_PHOTOS.PROFILE_PHOTO_6,
    SETTINGS.PROFILE_PHOTOS.PROFILE_PHOTO_7,
    SETTINGS.PROFILE_PHOTOS.PROFILE_PHOTO_8,
    SETTINGS.PROFILE_PHOTOS.PROFILE_PHOTO_9,
  ]);

  return (
    <div className="flex flex-wrap gap-4">
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
