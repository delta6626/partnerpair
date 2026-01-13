import { useState, type ChangeEvent } from "react";
import { SETTINGS } from "../../../shared/constants/SETTINGS";
import { useTempUserStore } from "../../store/useTempUserStore";
import { uploadUserPhoto } from "../../services/userProfile/userProfileServices";

export const ProfilePhotoSelector = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { tempUser, setTempUser } = useTempUserStore();

  if (!tempUser) return;

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);

    const files = e.target.files;
    if (!files || files?.length === 0) return; // TO DO: Show no-upload modal

    const selectedFile = files[0];

    if (selectedFile.size > SETTINGS.MAX_IMAGE_SIZE_BYTES) {
      console.error("File too large");
      e.target.value = "";
      setIsUploading(false);
      return;
    }

    if (!SETTINGS.ACCEPTED_IMAGE_TYPES.includes(selectedFile.type)) {
      console.error("Unsupported type");
      e.target.value = "";
      setIsUploading(false);
      return;
    }

    const photoUploaded = await uploadUserPhoto(selectedFile);

    // Error scenario

    if (typeof photoUploaded === "boolean") {
      setIsUploading(false);
      return;
      // TO DO: Show error modal
    }

    // Upload successfull

    setTempUser({ ...tempUser, basicInfo: { ...tempUser.basicInfo, profileImageUrl: photoUploaded } });
    setIsUploading(false);
  };

  const handleProfileImageURLReset = () => {
    setTempUser({
      ...tempUser,
      basicInfo: {
        ...tempUser.basicInfo,
        profileImageUrl: `${SETTINGS.DICEBEAR_API_URL}${tempUser.basicInfo.firstName}`,
      },
    });
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 w-full">
      <img
        className="w-30 h-30 rounded-full"
        src={tempUser?.basicInfo.profileImageUrl}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
      />

      <div className="flex flex-col gap-2">
        <input
          type="file"
          className="file-input file-input-primary"
          accept={SETTINGS.ACCEPTED_IMAGE_TYPES.join(",")}
          multiple={false}
          onChange={handleFileSelect}
        ></input>

        <button
          className="btn"
          disabled={tempUser?.basicInfo.profileImageUrl.includes(tempUser.basicInfo.firstName)}
          onClick={handleProfileImageURLReset}
        >
          Reset to default
        </button>
      </div>
    </div>
  );
};
