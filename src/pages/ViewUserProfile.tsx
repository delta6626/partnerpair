import { useParams } from "react-router-dom";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useTheme } from "../hooks/useTheme";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { Loader } from "../components/Loader";
import { functions } from "../services/firebaseConfig";
import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import type { DisplayableUserPro } from "../../shared/types/DisplayableUserPro";
import type { DisplayableUserBasic } from "../../shared/types/DisplayableUserBasic";
import { RenderProData } from "../components/ProfileViewer/RenderProData";
import { RenderBasicData } from "../components/ProfileViewer/RenderBasicData";

export const ViewUserProfile = () => {
  useTheme();

  const { id } = useParams();
  const { loading } = useInitializeUser();
  const getVisitedUserProfileData = httpsCallable(functions, "getVisitedUserProfileData");

  const [visitedUser, setVisitedUser] = useState<DisplayableUserPro | DisplayableUserBasic>();
  const [visitedUserDataLoaded, setVisitedUserDataLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading || !id) return;

    const fetchVisitedUserProfile = async () => {
      try {
        setError(null); // clear any previous error
        setVisitedUserDataLoaded(false);

        const response = await getVisitedUserProfileData({ visitedUserId: id });
        const data = response.data as DisplayableUserPro | DisplayableUserBasic;

        setVisitedUser(data);
      } catch (error: any) {
        // Extract Firebase HttpsError message
        const message = error?.message || error?.code || "An unknown error occurred while fetching the user profile.";
        setError(message);
      } finally {
        setVisitedUserDataLoaded(true);
      }
    };

    fetchVisitedUserProfile();
  }, [id, loading]);

  return (
    <div className="">
      {loading || !visitedUserDataLoaded ? (
        <div className="w-full h-[100vh] bg-base-300 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full min-h-[100vh] font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
          <div className="py-4">
            <MainNavbar />
          </div>

          <div className="w-full flex flex-col items-center py-10">
            {error ? (
              <div className="">
                <h1 className="text-3xl font-bold">An error occured</h1>
                <p>{error}</p>
              </div>
            ) : visitedUser ? (
              "socialLinks" in visitedUser ? (
                <RenderProData visitedUserData={visitedUser} />
              ) : (
                <RenderBasicData visitedUserData={visitedUser} />
              )
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};
