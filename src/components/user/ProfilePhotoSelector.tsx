import { useRef, useState, type ChangeEvent } from "react";
import { SETTINGS } from "../../../shared/constants/SETTINGS";
import { useTempUserStore } from "../../store/useTempUserStore";
import { uploadUserPhoto } from "../../services/userProfile/userProfileServices";
import { Loader } from "../Loader";
import { MODALS } from "../../../shared/constants/MODALS";

export const ProfilePhotoSelector = () => {
  const { tempUser, setTempUser } = useTempUserStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!tempUser) return;

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    const files = e.target.files;
    if (!files || files?.length === 0) return;

    const selectedFile = files[0];

    if (selectedFile.size > SETTINGS.MAX_IMAGE_SIZE_BYTES) {
      console.error("File too large");
      e.target.value = "";
      setIsLoading(false);

      const errorModal = document.getElementById(
        MODALS.PHOTO_UPLOAD_FAILED_FILE_SIZE_ERROR_MODAL.ID
      ) as HTMLDialogElement;

      errorModal.showModal();

      return;
    }

    if (!SETTINGS.ACCEPTED_IMAGE_TYPES.includes(selectedFile.type)) {
      console.error("Unsupported type");
      e.target.value = "";
      setIsLoading(false);

      const errorModal = document.getElementById(
        MODALS.PHOTO_UPLOAD_FAILED_UNSUPPORTED_TYPE_ERROR_MODAL.ID
      ) as HTMLDialogElement;

      errorModal.showModal();

      return;
    }

    const photoUploaded = await uploadUserPhoto(selectedFile);

    // Error scenario

    if (typeof photoUploaded === "boolean") {
      setIsLoading(false);

      const errorModal = document.getElementById(MODALS.PHOTO_UPLOAD_FAILED_ERROR_MODAL.ID) as HTMLDialogElement;
      errorModal.showModal();

      return;
    }

    // Upload successfull

    setTempUser({ ...tempUser, basicInfo: { ...tempUser.basicInfo, profileImageUrl: photoUploaded } });
    setIsLoading(false);
  };

  const handleProfileImageURLReset = () => {
    setTempUser({
      ...tempUser,
      basicInfo: {
        ...tempUser.basicInfo,
        profileImageUrl: `${SETTINGS.DICEBEAR_API_URL}${tempUser.basicInfo.firstName}`,
      },
    });

    if (!inputRef.current) return;
    inputRef.current.value = "";
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

      <div className="max-w-70 flex flex-col gap-2">
        <input
          type="file"
          className="file-input file-input-primary"
          accept={SETTINGS.ACCEPTED_IMAGE_TYPES.join(",")}
          multiple={false}
          onChange={handleFileSelect}
          disabled={isLoading}
          ref={inputRef}
        ></input>

        <button className="btn" disabled={isLoading} onClick={handleProfileImageURLReset}>
          Reset to default
        </button>
      </div>
    </div>
  );
};
