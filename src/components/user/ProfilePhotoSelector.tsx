import { useRef, useState, type ChangeEvent } from "react";
import { SETTINGS } from "../../../shared/constants/SETTINGS";
import { useTempUserStore } from "../../store/useTempUserStore";
import { deleteAllUserPhotos, uploadUserPhoto } from "../../services/userProfile/userProfileServices";
import { Loader } from "../Loader";

export const ProfilePhotoSelector = () => {
  const { tempUser, setTempUser } = useTempUserStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!tempUser) return;

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    const files = e.target.files;
    if (!files || files?.length === 0) return; // TO DO: Show no-upload modal

    const selectedFile = files[0];

    if (selectedFile.size > SETTINGS.MAX_IMAGE_SIZE_BYTES) {
      console.error("File too large");
      e.target.value = "";
      setIsLoading(false);
      return;
    }

    if (!SETTINGS.ACCEPTED_IMAGE_TYPES.includes(selectedFile.type)) {
      console.error("Unsupported type");
      e.target.value = "";
      setIsLoading(false);
      return;
    }

    const photoUploaded = await uploadUserPhoto(selectedFile);

    // Error scenario

    if (typeof photoUploaded === "boolean") {
      setIsLoading(false);
      return;
      // TO DO: Show error modal
    }

    // Upload successfull

    setTempUser({ ...tempUser, basicInfo: { ...tempUser.basicInfo, profileImageUrl: photoUploaded } });
    setIsLoading(false);
  };

  const handleProfileImageURLReset = async () => {
    setIsLoading(true);

    setTempUser({
      ...tempUser,
      basicInfo: {
        ...tempUser.basicInfo,
        profileImageUrl: `${SETTINGS.DICEBEAR_API_URL}${tempUser.basicInfo.firstName}`,
      },
    });

    if (!inputRef.current) return;
    inputRef.current.value = "";

    await deleteAllUserPhotos();
    setIsLoading(false);
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 w-full">
      <div className="relative">
        <img
          className={`w-30 h-30 rounded-full`}
          src={tempUser?.basicInfo.profileImageUrl}
          referrerPolicy="no-referrer"
        />

        {isLoading && (
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black opacity-80">
            <Loader />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="file"
          className="file-input file-input-primary"
          accept={SETTINGS.ACCEPTED_IMAGE_TYPES.join(",")}
          multiple={false}
          onChange={handleFileSelect}
          disabled={isLoading}
          ref={inputRef}
        ></input>

        <button
          className="btn"
          disabled={tempUser?.basicInfo.profileImageUrl.includes(tempUser.basicInfo.firstName) || isLoading}
          onClick={handleProfileImageURLReset}
        >
          Reset to default
        </button>
      </div>
    </div>
  );
};
