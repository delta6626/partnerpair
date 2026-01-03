import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { ProfileManager } from "../components/user/ProfileManager";
import { SETTINGS } from "../../shared/constants/SETTINGS";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";
import { useTempUserStore } from "../store/useTempUserStore";
import equal from "fast-deep-equal";
import { ProfessionalInformationManager } from "../components/user/ProfessionalInformationManager";
import { StartupInformationManager } from "../components/user/StartupInformationManager";
import { SocialLinksManager } from "../components/user/SocialLinksManager";
import { AccountManager } from "../components/user/AccountManager";
import { updateUserProfile } from "../services/userProfile/userProfileServices";
import { useUserStore } from "../store/useUserStore";
import { ProfileUpdateSuccessfulModal } from "../components/modals/ProfileUpdateSuccessfulModal";
import { MODALS } from "../../shared/constants/MODALS";
import { MatchingPreferenceManager } from "../components/user/MatchingPreferenceManager";
import { ProfileStatusMessage } from "../components/user/ProfileStatusMessage";
import { basicUserDataValid } from "../../shared/utils/basicUserDataValid";
import { profileComplete } from "../../shared/utils/profileComplete";
import type { User } from "../../shared/types/User";

export const Settings = () => {
  useTheme();

  const { user, loading } = useInitializeUser();
  const { tempUser, setTempUser } = useTempUserStore();
  const { setUser } = useUserStore();

  const [updating, setUpdating] = useState<boolean>(false);

  const handleResetButtonClick = () => {
    if (!user) return;
    setTempUser(user);
  };

  const handleProfileUpdate = async () => {
    if (!user || !tempUser) return;
    setUpdating(true);

    const profileStatus = profileComplete(tempUser);
    const updatedUser: User = {
      ...tempUser,
      basicInfo: { ...tempUser.basicInfo, profileCompleted: profileStatus === true ? true : false },
    };

    const chatMetaDataChanged =
      tempUser.basicInfo.firstName != user.basicInfo.firstName ||
      tempUser.basicInfo.lastName != user.basicInfo.lastName ||
      tempUser.professionalInfo.headline != user.professionalInfo.headline ||
      tempUser.basicInfo.profileImageUrl != user.basicInfo.profileImageUrl;

    const userProfileUpdated = await updateUserProfile(updatedUser, chatMetaDataChanged);

    if (typeof userProfileUpdated === "string") {
      // TODO: handle error case
      return;
    }

    // set user to temp user on success and open success modal
    setUser(updatedUser);

    const modal = document.getElementById(MODALS.PROFILE_UPDATE_SUCCESS_MODAL.ID) as HTMLDialogElement;
    modal.showModal();

    setUpdating(false);
  };

  // Set temp user to user on page render
  useEffect(() => {
    if (!user) return;
    setTempUser(user);
  }, [user]);

  return (
    <div className="font-inter">
      <ProfileUpdateSuccessfulModal />
      {loading ? (
        <div className="w-full min-h-[100vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full min-h-[100vh] bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
          <div className="py-4">
            <MainNavbar />
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-200">
              <ProfileStatusMessage />
            </div>

            <div className="w-full max-w-200 py-10 flex items-center justify-between">
              <div className="">
                <h1 className="font-bold text-3xl">Settings</h1>
                <p className="text-accent">{SETTINGS.SUBTITLE_TEXT}</p>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn btn-primary w-20"
                  disabled={equal(user, tempUser) || updating}
                  onClick={handleResetButtonClick}
                >
                  {SETTINGS.RESET_BUTTON_TEXT}
                </button>

                <button
                  className="btn btn-primary w-20"
                  disabled={!tempUser || equal(user, tempUser) || !basicUserDataValid(tempUser) || updating}
                  onClick={handleProfileUpdate}
                >
                  {updating ? (
                    <div className="flex items-center justify-center">
                      <Loader />
                    </div>
                  ) : (
                    SETTINGS.UPDATE_BUTTON_TEXT
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-100">
              <ProfileManager />
              <ProfessionalInformationManager />
              <StartupInformationManager />
              <MatchingPreferenceManager />
              <SocialLinksManager />
              <AccountManager />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
