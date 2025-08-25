import { Loader } from "../components/Loader";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";

export const Dashboard = () => {
  useTheme();
  const { user, loading } = useInitializeUser();

  return (
    <div className="">
      {loading ? (
        <div className="w-full h-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-[100vh] bg-base-300">
          {"Hello, " + user?.basicInfo.firstName}
        </div>
      )}
    </div>
  );
};
