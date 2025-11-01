import { functions } from "../../services/firebaseConfig";
import { httpsCallable } from "firebase/functions";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import { STALE_TIME } from "../../../shared/constants/STALE_TIME";
import { ChartLine } from "lucide-react";
import type { UserTier } from "../../../shared/types/UserTier";

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

  return (
    <div className="p-4 rounded-md bg-base-200 w-fit flex flex-col gap-2">
      <div className="flex items-center gap-8">
        <h1 className="flex shrink-0 gap-2">
          <ChartLine size={20} /> Profile Views
        </h1>

        <select className="select select-sm"></select>
      </div>
    </div>
  );
};
