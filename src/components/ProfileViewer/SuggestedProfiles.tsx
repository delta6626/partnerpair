import { httpsCallable } from "firebase/functions";
import { Link } from "react-router-dom";
import { functions } from "../../services/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import type { SuggestedProfile } from "../../../shared/types/SuggestedProfile";
import { STALE_TIME } from "../../../shared/constants/STALE_TIME";

export const SuggestedProfiles = () => {
  const getSuggestedProfiles = httpsCallable(functions, "getSuggestedProfiles");
  const { data, isLoading, isError } = useQuery({
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

      <div className="w-full grow py-8"></div>
    </div>
  );
};
