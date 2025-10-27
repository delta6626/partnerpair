import { Loader } from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";

export const Dashboard = () => {
  useTheme();
  const { user, loading } = useInitializeUser();

  return (
    <div className="">
      {loading ? (
        <div className="w-full h-[100vh] bg-base-300 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-[100vh] font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
          <div className="py-4">
            <MainNavbar />
          </div>

          <div className="py-8">
            <div>
              <h1 className="text-3xl font-bold">Hello, {user?.basicInfo.firstName}</h1>
              <h1 className="text-xl text-accent">Here's what's happening with your cofounder search.</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
