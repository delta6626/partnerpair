import { useQuery } from "@tanstack/react-query";
import { DashboardHeader } from "../components/DashboardHeader";
import { Loader } from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";
import { functions } from "../services/firebaseConfig";
import { httpsCallable } from "firebase/functions";
import { QUERY_KEYS } from "../../shared/constants/QUERY_KEYS";
import { STALE_TIME } from "../../shared/constants/STALE_TIME";

export const Dashboard = () => {
  useTheme();
  const { user, loading } = useInitializeUser();

  const getProfileViewCount = httpsCallable(functions, "getProfileViewCount");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEYS.PROFILE_VIEW_COUNT],
    queryFn: getProfileViewCount,
    staleTime: STALE_TIME.MINUTE_FIVE,
  });

  return (
    <div className="">
      {loading ? (
        <div className="w-full h-[100vh] bg-base-300 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-[100vh] font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
          <div className="py-4">
            <MainNavbar />
          </div>

          <DashboardHeader user={user} />
        </div>
      )}
    </div>
  );
};
