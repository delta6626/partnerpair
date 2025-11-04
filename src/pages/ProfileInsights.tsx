import { Loader } from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";

export const ProfileInsights = () => {
  useTheme();
  const { loading } = useInitializeUser();

  return (
    <div className="">
      {loading ? (
        <div className="w-full min-h-[100vh] bg-base-300 flex items-center justify-center">
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
                <h1 className="font-bold text-3xl">Profile Views</h1>
                <p className="text-accent">Track profile views and learn about your audience</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
