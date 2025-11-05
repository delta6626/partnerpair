import { useState, type ChangeEvent } from "react";
import { PROFILE_INSIGHTS } from "../../shared/constants/PROFILE_INSIGHTS";
import { Loader } from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";
import type { ProfileInsightsTimePeriod } from "../../shared/types/ProfileInsightsTimePeriod";

export const ProfileInsights = () => {
  useTheme();
  const { loading } = useInitializeUser();

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
        <div className="w-full min-h-[100vh] font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
          <div className="py-4">
            <MainNavbar />
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-200 py-10 flex items-center justify-between">
              <div className="">
                <h1 className="font-bold text-3xl">Profile Views</h1>
                <p className="text-accent">{PROFILE_INSIGHTS.SUBTITLE_TEXT}</p>
              </div>

              <select className="select" value={timePeriod} onChange={handleTimePeriodChange}>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7Days">Last 7 Days</option>
                <option value="last30Days">Last 30 Days</option>
                <option value="last90Days">Last 90 Days</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
