import { Check } from "lucide-react";

export const ProfilePhotoHolder = ({
  profilePhoto,
  currentProfilePhoto,
}: {
  profilePhoto: string;
  currentProfilePhoto: string;
}) => {
  return (
    <div>
      <img src={profilePhoto} />
      <Check size={20} className={currentProfilePhoto !== profilePhoto ? "hidden" : ""} />
    </div>
  );
};
