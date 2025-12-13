import { useEffect } from "react";
import { BROWSE } from "../../shared/constants/BROWSE";
import { SearchFiltersMenu } from "../components/browsing/SearchFiltersMenu";
import { Loader } from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { ProfileStatusMessage } from "../components/user/ProfileStatusMessage";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";
import { useFilterMenuStore } from "../store/useFilterMenuStore";
import { useSearchParams } from "react-router-dom";

export const Browse = () => {
  useTheme();
  const { loading } = useInitializeUser();
  const { isOpen, setIsOpen } = useFilterMenuStore();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.size === 0) return;
    // TODO: If size is not 0, initiate a search on load
  }, []);

  return (
    <div className="">
      {loading ? (
        <div className="w-full min-h-[100vh] bg-base-300 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full min-h-[100vh] font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
          <div className="py-4">
            <MainNavbar />
          </div>

          <div className="py-8">
            <div className="mb-4">
              <ProfileStatusMessage />
            </div>

            <div className="flex items-center justify-between">
              <div className="">
                <h1 className="font-bold text-3xl">Browse</h1>
                <p className="text-accent">{BROWSE.HEADER_SUB_TEXT}</p>
              </div>

              <div className="flex gap-2">
                <button className="btn" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? "Close Filters" : "Open Filters"}
                </button>

                <button className="btn btn-primary" disabled={searchParams.size === 0}>
                  Search
                </button>
              </div>
            </div>
          </div>

          {isOpen && <SearchFiltersMenu />}
        </div>
      )}
    </div>
  );
};
