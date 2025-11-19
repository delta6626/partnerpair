import { httpsCallable } from "firebase/functions";
import { Link } from "react-router-dom";
import { functions } from "../../services/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import type { SuggestedProfile } from "../../../shared/types/SuggestedProfile";
import { STALE_TIME } from "../../../shared/constants/STALE_TIME";
import { Loader } from "../Loader";
import { DASHBOARD } from "../../../shared/constants/DASHBOARD";

export const SuggestedProfiles = () => {
  const getSuggestedProfiles = httpsCallable(functions, "getSuggestedProfiles");
  const {
    data: suggestedProfiles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.SUGGESTED_PROFILES],
    queryFn: async () => {
      const response = await getSuggestedProfiles();
      return response.data as SuggestedProfile[];
    },
    staleTime: STALE_TIME.MINUTE_FIVE,
  });

  return (
    <div className="w-full flex flex-col grow">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Suggested Profiles</h1>
        <Link to="/browse" className="btn btn-primary">
          Browse all profiles
        </Link>
      </div>

      {isLoading ? (
        <div className="w-full grow flex items-center justify-center py-8">
          <Loader />
        </div>
      ) : isError ? (
        <div className="w-full grow flex items-center justify-center py-8">
          <p className="text-accent">{DASHBOARD.SUGGESTED_PROFILE_LOADING_ERROR}</p>
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};
