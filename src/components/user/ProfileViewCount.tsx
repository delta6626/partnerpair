import { functions } from "../../services/firebaseConfig";
import { httpsCallable } from "firebase/functions";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import { STALE_TIME } from "../../../shared/constants/STALE_TIME";

export const ProfileViewCount = () => {
  const getProfileViewCount = httpsCallable(functions, "getProfileViewCount");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.PROFILE_VIEW_COUNT],
    queryFn: async () => {
      const response = await getProfileViewCount();
      return response.data as number | number[];
    },
    staleTime: STALE_TIME.MINUTE_FIVE,
  });

  return <div className=""></div>;
};
