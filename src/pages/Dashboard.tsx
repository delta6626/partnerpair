import { Loader } from "../components/Loader";
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
        <div className="w-full h-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-[100vh] bg-base-300">
          {"Hello, " + user?.basicInfo.firstName}
          <button className="btn btn-primary" onClick={handleSignOut}></button>
        </div>
      )}
    </div>
  );
};
