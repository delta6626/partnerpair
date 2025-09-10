import { useEffect } from "react";
import Loader from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { ProfileManager } from "../components/user/ProfileManager";
import { SETTINGS } from "../constants/SETTINGS";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";
import { useTempUserStore } from "../store/useTempUserStore";
import equal from "fast-deep-equal";
import { ProfessionalInformationManager } from "../components/user/ProfessionalInformationManager";
import { StartupInformationManager } from "../components/user/StartupInformationManager";
import { SocialLinksManager } from "../components/user/SocialLinksManager";

export const Settings = () => {
  useTheme();

  const { user, loading } = useInitializeUser();
  const { tempUser, setTempUser } = useTempUserStore();

  const handleResetButtonClick = () => {
    if (!user) return;
    setTempUser(user);
  };

  // Set temp user to user on page render
  useEffect(() => {
    if (!user) return;
    setTempUser(user);
  }, [user]);

  return (
    <div className="">
      {loading ? (
        <div className="w-full min-h-[100vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full min-h-[100vh] font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
          <div className="py-4">
            <MainNavbar />
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-200 py-10 flex items-center justify-between">
              <div className="">
                <h1 className="font-bold text-3xl">Settings</h1>
                <p>{SETTINGS.SUBTITLE_TEXT}</p>
              </div>

              <div className="flex gap-2">
                <button className="btn btn-primary" disabled={equal(user, tempUser)} onClick={handleResetButtonClick}>
                  {SETTINGS.RESET_BUTTON_TEXT}
                </button>

                <button className="btn btn-primary" disabled={equal(user, tempUser)}>
                  {SETTINGS.UPDATE_BUTTON_TEXT}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-100">
              <ProfileManager />
              <ProfessionalInformationManager />
              <StartupInformationManager />
              <SocialLinksManager />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
