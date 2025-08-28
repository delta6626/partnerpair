export const ProfilePhotoHolder = ({
  profilePhoto,
  currentProfilePhoto,
  setCurrentProfilePhoto,
}: {
  profilePhoto: string;
  currentProfilePhoto: string;
  setCurrentProfilePhoto: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const handleProfilePhotoClick = () => {
    setCurrentProfilePhoto(profilePhoto);
  };

  return (
    <div className="">
      <div className="relative w-12 h-12" onClick={handleProfilePhotoClick}>
        <img
          className={`w-12 h-12 rounded-full ${
            currentProfilePhoto === profilePhoto ? "outline-2 outline-primary" : ""
          }`}
          src={profilePhoto}
        />
      </div>
    </div>
  );
};
