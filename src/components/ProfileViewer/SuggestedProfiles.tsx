import { httpsCallable } from "firebase/functions";
import { Link } from "react-router-dom";
import { functions } from "../../services/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import type { SuggestedProfile } from "../../../shared/types/SuggestedProfile";
import { STALE_TIME } from "../../../shared/constants/STALE_TIME";
import { Loader } from "../Loader";
import { DASHBOARD } from "../../../shared/constants/DASHBOARD";
import { UserProfileCard } from "./UserProfileCard";

export const SuggestedProfiles = () => {
  const getSuggestedProfiles = httpsCallable(functions, "getSuggestedProfiles");
  const {
    data: suggestedProfiles,
    isLoading,
    isError,
    error,
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
      ) : isError || !suggestedProfiles ? (
        <div className="w-full grow flex items-center justify-center py-8">
          <p className="text-accent">{DASHBOARD.SUGGESTED_PROFILE_LOADING_ERROR + " " + error}</p>
        </div>
      ) : (
        <div className="flex flex-wrap">
          {suggestedProfiles.map((suggestedUser, index) => {
            return <UserProfileCard key={index} userData={suggestedUser} />;
          })}
        </div>
      )}
    </div>
  );
};
