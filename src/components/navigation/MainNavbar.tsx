import { Logo } from "../landing/Logo";
import { MainNavbarNavigationItems } from "./MainNavbarNavigationItems";
import { ProfileDropdown } from "../user/ProfileDropdown";
import { ProfileUpdateSuccessfulModal } from "../modals/ProfileUpdateSuccessfulModal";
import { SuggestedProfilesInformationModal } from "../modals/SuggestedProfilesInformationModal";
import { MODALS } from "../../../shared/constants/MODALS";
import { GenericErrorModal } from "../modals/GenericErrorModal";
import { AbuseReportSuccessfulModal } from "../modals/AbuseReportSuccessfulModal";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { MaxContactsReachedModal } from "../modals/MaxContactsReachedModal";
import { MaxChatsReachedModal } from "../modals/MaxChatsReachedErrorModal";
import { DeleteAccountModal } from "../modals/DeleteAccountModal";
import { AccountDeletionSuccessfulModal } from "../modals/AccountDeletionSuccessfulModal";

export const MainNavbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleMenuButtonClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="">
        <Logo link={"/home"} />
      </div>

      <div className="hidden lg:block">
        <MainNavbarNavigationItems />
      </div>

      <div className="flex gap-2">
        {/* <NotificationOverview /> */}
        <ProfileDropdown />
        <button className="btn btn-square lg:hidden" onClick={handleMenuButtonClick}>
          <Menu size={20} />
        </button>
      </div>

      {menuOpen && (
        <div className="bg-base-300 paddingContainer py-4 fixed inset-0 lg:hidden z-10">
          <div className="flex justify-between items-center">
            <Logo />
            <button className="btn btn-square" onClick={handleMenuButtonClick}>
              <X size={20} />
            </button>
          </div>

          <MainNavbarNavigationItems forMobile={true} />
        </div>
      )}

      <ProfileUpdateSuccessfulModal />

      <SuggestedProfilesInformationModal />

      <AbuseReportSuccessfulModal />

      <MaxContactsReachedModal />

      <MaxChatsReachedModal />

      <DeleteAccountModal />

      <AccountDeletionSuccessfulModal />

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
        modalId={MODALS.CHAT_CREATION_FAILED_ERROR_MODAL.ID}
        errorTitle={MODALS.CHAT_CREATION_FAILED_ERROR_MODAL.TITLE}
        errorText={MODALS.CHAT_CREATION_FAILED_ERROR_MODAL.DESCRIPTION}
      />

      <GenericErrorModal
        modalId={MODALS.SUBSCRIPTION_CREATION_FAILED_ERROR_MODAL.ID}
        errorTitle={MODALS.SUBSCRIPTION_CREATION_FAILED_ERROR_MODAL.TITLE}
        errorText={MODALS.SUBSCRIPTION_CREATION_FAILED_ERROR_MODAL.DESCRIPTION}
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

      <GenericErrorModal
        modalId={MODALS.ABUSE_REPORT_FAILED_ERROR_MODAL.ID}
        errorTitle={MODALS.ABUSE_REPORT_FAILED_ERROR_MODAL.TITLE}
        errorText={MODALS.ABUSE_REPORT_FAILED_ERROR_MODAL.DESCRIPTION}
      />

      <GenericErrorModal
        modalId={MODALS.ACCOUNT_DELETION_FAILED_MODAL.ID}
        errorTitle={MODALS.ACCOUNT_DELETION_FAILED_MODAL.TITLE}
        errorText={MODALS.ACCOUNT_DELETION_FAILED_MODAL.DESCRIPTION}
      />
    </div>
  );
};
