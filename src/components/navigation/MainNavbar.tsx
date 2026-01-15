import { Logo } from "../branding/Logo";
import { MainNavbarNavigationItems } from "./MainNavbarNavigationItems";
import { ProfileDropdown } from "../user/ProfileDropdown";
import { ProfileUpdateSuccessfulModal } from "../modals/ProfileUpdateSuccessfulModal";
import { SuggestedProfilesInformationModal } from "../modals/SuggestedProfilesInformationModal";
import { MODALS } from "../../../shared/constants/MODALS";
import { GenericErrorModal } from "../modals/GenericErrorModal";

export const MainNavbar = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="">
        <Logo />
      </div>

      <div className="">
        <MainNavbarNavigationItems />
      </div>

      <div className="flex gap-2">
        {/* <NotificationOverview /> */}
        <ProfileDropdown />
      </div>

      <ProfileUpdateSuccessfulModal />

      <SuggestedProfilesInformationModal />

      <GenericErrorModal
        modalId={MODALS.PROFILE_UPDATE_ERROR_MODAL.ID}
        errorTitle={MODALS.PROFILE_UPDATE_ERROR_MODAL.TITLE}
        errorText={MODALS.PROFILE_UPDATE_ERROR_MODAL.DESCRIPTION}
      />

      <GenericErrorModal
        modalId={MODALS.CHAT_DELETE_ERROR_MODAL.ID}
        errorTitle={MODALS.CHAT_DELETE_ERROR_MODAL.TITLE}
        errorText={MODALS.CHAT_DELETE_ERROR_MODAL.DESCRIPTION}
      />

      <GenericErrorModal
        modalId={MODALS.FAILED_MESSAGE_ERROR_MODAL.ID}
        errorTitle={MODALS.FAILED_MESSAGE_ERROR_MODAL.TITLE}
        errorText={MODALS.FAILED_MESSAGE_ERROR_MODAL.DESCRIPTION}
      />

      <GenericErrorModal
        modalId={MODALS.CONTACT_ADDITION_FAILED_ERROR_MODAL.ID}
        errorTitle={MODALS.CONTACT_ADDITION_FAILED_ERROR_MODAL.TITLE}
        errorText={MODALS.CONTACT_ADDITION_FAILED_ERROR_MODAL.DESCRIPTION}
      />

      <GenericErrorModal
        modalId={MODALS.CONTACT_DELETION_FAILED_ERROR_MODAL.ID}
        errorTitle={MODALS.CONTACT_DELETION_FAILED_ERROR_MODAL.TITLE}
        errorText={MODALS.CONTACT_DELETION_FAILED_ERROR_MODAL.DESCRIPTION}
      />

      <GenericErrorModal
        modalId={MODALS.PHOTO_UPLOAD_FAILED_ERROR_MODAL.ID}
        errorTitle={MODALS.PHOTO_UPLOAD_FAILED_ERROR_MODAL.TITLE}
        errorText={MODALS.PHOTO_UPLOAD_FAILED_ERROR_MODAL.DESCRIPTION}
      />

      <GenericErrorModal
        modalId={MODALS.PHOTO_UPLOAD_FAILED_FILE_SIZE_ERROR_MODAL.ID}
        errorTitle={MODALS.PHOTO_UPLOAD_FAILED_FILE_SIZE_ERROR_MODAL.TITLE}
        errorText={MODALS.PHOTO_UPLOAD_FAILED_FILE_SIZE_ERROR_MODAL.DESCRIPTION}
      />

      <GenericErrorModal
        modalId={MODALS.PHOTO_UPLOAD_FAILED_UNSUPPORTED_TYPE_ERROR_MODAL.ID}
        errorTitle={MODALS.PHOTO_UPLOAD_FAILED_UNSUPPORTED_TYPE_ERROR_MODAL.TITLE}
        errorText={MODALS.PHOTO_UPLOAD_FAILED_UNSUPPORTED_TYPE_ERROR_MODAL.DESCRIPTION}
      />
    </div>
  );
};
