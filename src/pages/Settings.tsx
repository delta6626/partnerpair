import Loader from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";

export const Settings = () => {
  useTheme();
  const { user, loading } = useInitializeUser();

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

          <div className="w-full py-10">
            <h1 className="font-bold text-3xl">Settings</h1>
            <p>Manage your account preferences and profile settings</p>
          </div>
        </div>
      )}
    </div>
  );
};
