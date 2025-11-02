import { functions } from "../../services/firebaseConfig";
import { httpsCallable } from "firebase/functions";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import { STALE_TIME } from "../../../shared/constants/STALE_TIME";
import { ChartLine } from "lucide-react";
import type { UserTier } from "../../../shared/types/UserTier";
import { useState, type ChangeEvent } from "react";
import { DASHBOARD } from "../../../shared/constants/DASHBOARD";
import { Loader } from "../Loader";

export const ProfileViewCount = () => {
  const getUserTier = httpsCallable(functions, "getUserTier");
  const getProfileViewCount = httpsCallable(functions, "getProfileViewCount");

  const {
    data: userTier,
    isLoading: isUserTierLoading,
    isError: isUserTierError,
    error: userTierError,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER_TIER],
    queryFn: async () => {
      const response = await getUserTier();
      return response.data as UserTier;
    },
    staleTime: STALE_TIME.MINUTE_FIVE,
  });

  const {
    data: viewCount,
    isLoading: isViewCountLoading,
    isError: isViewCountError,
    error: viewCountError,
  } = useQuery({
    queryKey: [QUERY_KEYS.PROFILE_VIEW_COUNT],
    queryFn: async () => {
      const response = await getProfileViewCount();
      return response.data as number | number[];
    },
    staleTime: STALE_TIME.MINUTE_FIVE,
  });

  const [timePeriod, setTimePeriod] = useState<string>("last7Days");

  const handleTimePeriodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimePeriod(e.target.value);
  };

  return (
    <div className="p-4 rounded-3xl bg-base-200 w-fit flex flex-col gap-2">
      {!isUserTierLoading && !isUserTierError && !isViewCountLoading && !isViewCountError && userTier && viewCount ? (
        <div className="">
          <div className="flex items-center gap-4">
            <h1 className="flex shrink-0 gap-2">
              <ChartLine size={20} />
              Profile Views
            </h1>

            <select
              className="select select-sm bg-base-200"
              value={timePeriod}
              disabled={userTier === "Basic"}
              onChange={handleTimePeriodChange}
            >
              <option value={"last7Days"}>Last 7 Days</option>
              <option value={"last30Days"}>Last 30 Days</option>
              <option value={"last90Days"}>Last 90 Days</option>
            </select>
          </div>

          <div className="mt-2 text-center">
            {
              <h1 className="text-3xl font-bold">
                {typeof viewCount === "number"
                  ? viewCount
                  : timePeriod === "last7Days"
                  ? viewCount[0]
                  : timePeriod === "last30Days"
                  ? viewCount[1]
                  : viewCount[2]}
              </h1>
            }

            <p className="mt-2 text-accent">
              {userTier === "Basic" ? DASHBOARD.PROFILE_COUNTER_USER_BASIC : DASHBOARD.PROFILE_COUNTER_USER_PRO}
            </p>
          </div>
        </div>
      ) : isUserTierLoading || isViewCountLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
