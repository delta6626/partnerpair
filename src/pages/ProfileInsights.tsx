import { useState, type ChangeEvent } from "react";
import { PROFILE_INSIGHTS } from "../../shared/constants/PROFILE_INSIGHTS";
import { Loader } from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";
import type { ProfileInsightsTimePeriod } from "../../shared/types/ProfileInsightsTimePeriod";
import { httpsCallable } from "firebase/functions";
import { functions } from "../services/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../shared/constants/QUERY_KEYS";
import type { ViewerMetaData } from "../../shared/types/ViewerMetaData";
import { VisitedUserCollection } from "../components/user/VisitedUserCollection";

export const ProfileInsights = () => {
  useTheme();
  const { loading } = useInitializeUser();

  const getProfileViewData = httpsCallable(functions, "getProfileViewData");

  const {
    data: profileViewData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.PROFILE_VIEW_DATA],
    queryFn: async () => {
      const response = await getProfileViewData();
      return response.data as ViewerMetaData[];
    },
  });

  const [timePeriod, setTimePeriod] = useState<ProfileInsightsTimePeriod>("last7Days");

  const handleTimePeriodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimePeriod(e.target.value as ProfileInsightsTimePeriod);
  };

  return (
    <div className="">
      {loading ? (
        <div className="w-full min-h-[100vh] bg-base-300 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full flex flex-col min-h-[100vh] font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
          <div className="py-4">
            <MainNavbar />
          </div>

          <div className="w-full flex flex-1 flex-col items-center">
            <div
              className={`${
                isLoading || isError ? "pt-10" : "py-10"
              } w-full max-w-200 flex items-center justify-between`}
            >
              <div className="">
                <h1 className="font-bold text-3xl">Profile Views</h1>
                <p className="text-accent">{PROFILE_INSIGHTS.SUBTITLE_TEXT}</p>
              </div>

              <select className="select max-w-50" value={timePeriod} onChange={handleTimePeriodChange}>
                <option value="last24Hours">Last 24 Hours</option>
                <option value="last7Days">Last 7 Days</option>
                <option value="last30Days">Last 30 Days</option>
                <option value="last90Days">Last 90 Days</option>
              </select>
            </div>

            <div className="flex flex-1">
              {isLoading ? (
                <div className="flex flex-1 items-center justify-center">
                  <Loader />
                </div>
              ) : isError ? (
                <div className="flex flex-col flex-1 items-center justify-center">
                  <h1 className="text-2xl text-error font-semibold">An error occured</h1>
                  <p className="text text-accent">{error.message}</p>
                </div>
              ) : (
                profileViewData && <VisitedUserCollection visitedUsers={profileViewData} timePeriod={timePeriod} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
