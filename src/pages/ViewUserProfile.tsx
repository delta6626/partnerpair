import { useParams } from "react-router-dom";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useTheme } from "../hooks/useTheme";
import { useInitializeUser } from "../hooks/useInitializeUser";
import Loader from "../components/Loader";
import { getProfileData } from "../utils/getProfileData";

export const ViewUserProfile = () => {
  useTheme();

  const { id } = useParams(); // Use later while actually making the API call.
  const { loading } = useInitializeUser();
  const user = getProfileData("Pro"); // Mock data from stub

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

          <div className="w-full max-w-200 py-10 flex items-center justify-between"></div>
        </div>
      )}
    </div>
  );
};
