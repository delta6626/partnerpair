import { useState } from "react";
import { SETTINGS } from "../../constants/SETTINGS";

export const ProfilePhotoSelector = () => {
  const [profilePhotos] = useState([SETTINGS.PROFILE_PHOTOS.DEFAULT_PROFILE_PHOTO]);

  return <div className=""></div>;
};
