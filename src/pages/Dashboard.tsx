import { useQuery } from "@tanstack/react-query";
import { DashboardHeader } from "../components/DashboardHeader";
import { Loader } from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { SuggestedProfiles } from "../components/ProfileViewer/SuggestedProfiles";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";
import { QUERY_KEYS } from "../../shared/constants/QUERY_KEYS";
import { getUserId } from "../services/authentication/authServices";
import { Link } from "react-router-dom";
import { useVerificationCheck } from "../hooks/useVerificationCheck";

export const Dashboard = () => {
  useTheme();
  useVerificationCheck();

  const { user, loading } = useInitializeUser();
  const { isLoading: userIdLoading } = useQuery({
    queryKey: [QUERY_KEYS.USER_ID],
    queryFn: getUserId,
    staleTime: Infinity,
  });

  return (
    <div>
      {loading || userIdLoading ? (
        <div className="w-full min-h-[100vh] bg-base-300 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full flex flex-col grow min-h-[100vh] font-inter bg-base-300 paddingContainer">
          <div className="py-4">
            <MainNavbar />
          </div>
          <DashboardHeader user={user} />
          <SuggestedProfiles />

          <div className="py-8 w-full flex flex-col items-center gap-2">
            <p className="text-accent">Not what you're looking for?</p>
            <Link className="btn" to={"/browse"}>
              Browse more
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
