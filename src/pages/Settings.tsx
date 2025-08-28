import Loader from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { ProfileManager } from "../components/user/ProfileManager";
import { SETTINGS } from "../constants/SETTINGS";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";

export const Settings = () => {
  useTheme();
  const { loading } = useInitializeUser();

  return (
    <div className="">
      {loading ? (
        <div className="w-full h-[100vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-[100vh] font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
          <div className="py-4">
            <MainNavbar />
          </div>

          <div className="flex flex-col items-center">
            <div className="py-10 text-center">
              <h1 className="font-bold text-3xl">Settings</h1>
              <p>{SETTINGS.SUBTITLE_TEXT}</p>
            </div>

            <div className="w-fit border-1 border-accent rounded-3xl p-4">
              <ProfileManager />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
