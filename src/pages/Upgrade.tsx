import { Loader } from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";

export const Upgrade = () => {
  useTheme();
  const { user, loading } = useInitializeUser();

  if (loading) {
    return (
      <div className="w-full min-h-[100vh] bg-base-300 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100vh] font-inter bg-base-300 paddingContainer">
      <div className="py-4">
        <MainNavbar />
      </div>
    </div>
  );
};
