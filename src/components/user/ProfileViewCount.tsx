import { useNavigate } from "react-router-dom";
import { functions } from "../../services/firebaseConfig";
import { httpsCallable } from "firebase/functions";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import { STALE_TIME } from "../../../shared/constants/STALE_TIME";
import { Eye } from "lucide-react";
import type { UserTier } from "../../../shared/types/UserTier";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import { DASHBOARD } from "../../../shared/constants/DASHBOARD";
import { Loader } from "../Loader";
import type { ProfileInsightsTimePeriod } from "../../../shared/types/ProfileInsightsTimePeriod";

export const ProfileViewCount = () => {
  const navigate = useNavigate();

  const getUserTier = httpsCallable(functions, "getUserTier");
  const getProfileViewCount = httpsCallable(functions, "getProfileViewCount");

  const {
    data: userTier,
    isLoading: isUserTierLoading,
    isError: isUserTierError,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER_TIER],
    queryFn: async () => {
      const response = await getUserTier();
      return response.data as UserTier;
    },
  });

  const {
    data: viewCount,
    isLoading: isViewCountLoading,
    isError: isViewCountError,
  } = useQuery({
    queryKey: [QUERY_KEYS.PROFILE_VIEW_COUNT],
    queryFn: async () => {
      const response = await getProfileViewCount();
      return response.data as number | number[];
    },
    staleTime: STALE_TIME.MINUTE_FIVE,
  });

  const [timePeriod, setTimePeriod] = useState<ProfileInsightsTimePeriod>("last7Days");

  const handleViewCountClick = () => {
    if (userTier === "Basic") return;
    navigate("/profileInsights");
  };

  const handleTimePeriodClick = (e: MouseEvent) => {
    e.stopPropagation(); // Stop redirect to profileInsights on click
  };

  const handleTimePeriodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimePeriod(e.target.value as ProfileInsightsTimePeriod);
  };

  return (
    <div
      className={`${
        userTier && userTier === "Pro" ? "cursor-pointer" : ""
      } p-4 rounded-3xl bg-base-200 min-w-65 xl:min-w-75 w-fit flex flex-col gap-2 border border-base-100`}
      onClick={handleViewCountClick}
    >
      <div className="flex items-start gap-4">
        <h1 className="flex shrink-0 gap-2 items-center text-accent">
          <Eye size={20} />
          Profile Views
        </h1>

        <select
          className="select select-sm bg-base-200 hidden lg:block"
          value={timePeriod}
          disabled={userTier === "Basic" || isUserTierLoading || isUserTierError}
          onClick={handleTimePeriodClick}
          onChange={handleTimePeriodChange}
        >
          <option value="last24Hours">Last 24 Hours</option>
          <option value="last7Days">Last 7 Days</option>
          <option value="last30Days">Last 30 Days</option>
          <option value="last90Days">Last 90 Days</option>
        </select>
      </div>

      {isUserTierLoading || isViewCountLoading || userTier === undefined || viewCount === undefined ? (
        <div className="w-full flex justify-center items-center py-4">
          <Loader />
        </div>
      ) : isUserTierError || isViewCountError ? (
        <div className="w-full text-center py-4">
          <h1 className="text-error font-semibold">An error occurred</h1>
          <p className="text-accent">Please refresh the page and try again.</p>
        </div>
      ) : (
        <div className="mt-2 text-center">
          <h1 className="text-3xl font-semibold">
            {typeof viewCount === "number"
              ? viewCount
              : timePeriod === "last24Hours"
                ? viewCount[0]
                : timePeriod === "last7Days"
                  ? viewCount[1]
                  : timePeriod === "last30Days"
                    ? viewCount[2]
                    : viewCount[3]}
          </h1>
          <p className="mt-2 text-accent">
            {userTier === "Basic" ? DASHBOARD.PROFILE_COUNTER_USER_BASIC : DASHBOARD.PROFILE_COUNTER_USER_PRO}
          </p>
        </div>
      )}

      <div className="w-full flex items-center justify-center lg:hidden">
        <select
          className="select select-sm bg-base-200 w-fit"
          value={timePeriod}
          disabled={userTier === "Basic" || isUserTierLoading || isUserTierError}
          onClick={handleTimePeriodClick}
          onChange={handleTimePeriodChange}
        >
          <option value="last24Hours">Last 24 Hours</option>
          <option value="last7Days">Last 7 Days</option>
          <option value="last30Days">Last 30 Days</option>
          <option value="last90Days">Last 90 Days</option>
        </select>
      </div>
    </div>
  );
};
