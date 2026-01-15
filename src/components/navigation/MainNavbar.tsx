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
    </div>
  );
};
