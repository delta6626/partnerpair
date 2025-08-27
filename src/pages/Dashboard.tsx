import { Loader } from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { SIGNUP } from "../constants/SIGNUP";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";
import { signOut } from "../sevices/authentication/authServices";

export const Dashboard = () => {
  useTheme();
  const { user, loading } = useInitializeUser();

  const handleSignOut = async () => {
    const signOutStatus = await signOut();
    if (signOutStatus === SIGNUP.SIGNOUT_SUCCESS) {
      return;
    } else {
      console.log(signOutStatus);
    }
  };

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
        </div>
      )}
    </div>
  );
};
