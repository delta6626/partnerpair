import { useParams } from "react-router-dom";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useTheme } from "../hooks/useTheme";
import { useInitializeUser } from "../hooks/useInitializeUser";
import Loader from "../components/Loader";
import { getProfileData } from "../utils/getProfileData";
import { CircleStar } from "lucide-react";

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

          <div className="w-full flex flex-col items-center py-10">
            <div className="w-full max-w-200 border-1 border-accent rounded-3xl p-4">
              <div className="flex gap-4">
                <div className="">
                  <img src={user.basicInfo.profileImageUrl} className="w-36 h-36 rounded-full" />
                </div>

                <div className="flex-grow-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-medium">{user.basicInfo.firstName + " " + user.basicInfo.lastName}</h1>
                    <CircleStar className="text-primary" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
