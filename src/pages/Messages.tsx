import { Loader } from "lucide-react";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";
import { ProfileStatusMessage } from "../components/user/ProfileStatusMessage";
import { MESSAGES } from "../../shared/constants/MESSAGES";

export const Messages = () => {
  useTheme();
  const { user, loading } = useInitializeUser();

  return (
    <div className="">
      {loading ? (
        <div className="w-full min-h-[100vh] bg-base-300 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full flex flex-col grow min-h-[100vh] font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
          <div className="py-4">
            <MainNavbar />
          </div>

          <div className="py-8">
            <div className="mb-4">
              <ProfileStatusMessage />
            </div>

            <div className="">
              <h1 className="font-bold text-3xl">Messages</h1>
              <p className="text-accent">{MESSAGES.MESSAGE_SUBTEXT}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
