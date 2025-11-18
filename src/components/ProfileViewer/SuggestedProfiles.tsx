import { httpsCallable } from "firebase/functions";
import { Link } from "react-router-dom";
import { functions } from "../../services/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";

export const SuggestedProfiles = () => {
  const getSuggestedProfiles = httpsCallable(functions, "getSuggestedProfiles");
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.SUGGESTED_PROFILES],
    queryFn: async () => {
      const response = await getSuggestedProfiles();
      return response.data;
    },
  });

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Suggested Profiles</h1>
        <Link to="/browse" className="btn btn-primary">
          Browse all profiles
        </Link>
      </div>
    </div>
  );
};
