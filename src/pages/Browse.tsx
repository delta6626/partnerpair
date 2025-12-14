import { useEffect, useState } from "react";
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

  const arrayKeys = [
    BROWSE.PARAM_SKILLS,
    BROWSE.PARAM_ROLES,
    BROWSE.PARAM_COMMITMENT_LEVELS,
    BROWSE.PARAM_AVAILABILITY,
    BROWSE.PARAM_PREFERRED_STARTUP_STAGES,
    BROWSE.PARAM_SKILLS_SOUGHT,
    BROWSE.PARAM_ROLES_SOUGHT,
    BROWSE.PARAM_COMMITMENT_LEVELS_SOUGHT,
    BROWSE.PARAM_AVAILABILITY_SOUGHT,
  ];

  const stringKeys = [BROWSE.PARAM_LOCATION, BROWSE.PARAM_PROFILE_TYPE];

  const { loading } = useInitializeUser();
  const { isOpen, setIsOpen } = useFilterMenuStore();

  const [searchParams] = useSearchParams();
  const [searchParamsObject, setSearchParamsObject] = useState<Record<string, string | string[]>>();

  const handleSearch = () => {
    console.log(searchParamsObject);
  };

  useEffect(() => {
    const paramsObject: Record<string, string | string[]> = Object.fromEntries(searchParams.entries());

    arrayKeys.forEach((key) => {
      const value = paramsObject[key];

      if (typeof value === "string") {
        paramsObject[key] = value.split(",");
      } else {
        paramsObject[key] = [];
      }
    });

    stringKeys.forEach((key) => {
      const value = paramsObject[key];
      if (value) {
        paramsObject[key] = value;
      } else {
        paramsObject[key] = "";
      }
    });

    setSearchParamsObject(paramsObject);
  }, [searchParams]);

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

                <button className="btn btn-primary" disabled={searchParams.size === 0} onClick={handleSearch}>
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
