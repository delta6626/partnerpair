export const ProfilePhotoHolder = ({
  profilePhoto,
  currentProfilePhoto,
}: {
  profilePhoto: string;
  currentProfilePhoto: string;
}) => {
  return (
    <div className="">
      <div className="relative w-12 h-12">
        <img
          className={`w-12 h-12 rounded-full ${currentProfilePhoto === profilePhoto ? "border-2 border-primary" : ""}`}
          src={profilePhoto}
        />
      </div>
    </div>
  );
};
