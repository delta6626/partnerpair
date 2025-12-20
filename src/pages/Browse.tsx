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
import type { SearchParams } from "../../shared/types/SearchParams";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../shared/constants/QUERY_KEYS";
import type { FilteredUsersPayload } from "../../shared/types/FilteredUsersPayload";
import { httpsCallable } from "firebase/functions";
import { functions } from "../services/firebaseConfig";
import { UserProfileCard } from "../components/ProfileViewer/UserProfileCard";
import { useInView } from "react-intersection-observer";

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
  const [searchParamsObject, setSearchParamsObject] = useState<SearchParams>();

  const getFilteredUsers = httpsCallable(functions, "getFilteredUsers");

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    refetch,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.FILTERED_USERS],
    queryFn: async ({ pageParam }) => {
      const response = await getFilteredUsers({ searchParams: searchParamsObject, cursor: pageParam });
      return response.data as FilteredUsersPayload;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: FilteredUsersPayload) => lastPage.nextCursor,
    enabled: false,
    retry: (failureCount, error) => {
      if (error.message === "Pro features cannot be accessed by Basic tier user.") return false;
      return failureCount < BROWSE.MAX_RETRIES;
    },
  });

  const { ref, inView } = useInView();

  const handleSearch = () => {
    refetch();
  };

  const allUsers = data?.pages.flatMap((page) => page.users) ?? [];

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

    setSearchParamsObject(paramsObject as unknown as SearchParams);
  }, [searchParams]);

  useEffect(() => {
    if (inView && searchParams.size != 0 && !error) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    queryClient.removeQueries({ queryKey: [QUERY_KEYS.FILTERED_USERS] });
  }, []);

  return (
    <div className="">
      {loading ? (
        <div className="w-full min-h-[100vh] bg-base-300 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full min-h-[100vh] flex flex-col font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
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

          {!data && !isLoading && !isError && (
            <div className="flex w-full flex-1 items-center justify-center">
              <h1 className="text-accent">{BROWSE.SEARCH_INSTRUCTION_MESSAGE}</h1>
            </div>
          )}

          {(isLoading || isRefetching) && (
            <div className="flex w-full flex-1 items-center justify-center">
              <Loader />
            </div>
          )}

          {isError && (
            <div className="flex w-full flex-col flex-1 items-center justify-center">
              <h1 className="text-4xl font-bold">{BROWSE.SEARCH_ERROR}</h1>
              <p className="text-accent">Error: {error.message}</p>
            </div>
          )}

          {data && data.pages.length <= 1 && data.pages[0].users.length === 0 && !isRefetching && (
            <div className="flex w-full flex-1 items-center justify-center">
              <h1 className="text-accent">{BROWSE.SEARCH_RESULTS_EMPTY}</h1>
            </div>
          )}

          {!isLoading && !isRefetching && (
            <div className="">
              {
                <>
                  <div className="grid grid-cols-2 gap-4 pt-8">
                    {allUsers &&
                      allUsers.map((user) => {
                        return <UserProfileCard userData={user} />;
                      })}
                  </div>

                  {data && data.pages.length === 1 && data.pages[0].users.length !== 0 && !hasNextPage && (
                    <h1 className="py-8 text-accent text-center">{BROWSE.PAGINATION_END}</h1>
                  )}
                </>
              }

              <div className="w-full flex items-center justify-center py-8" ref={ref}>
                {isFetchingNextPage && <Loader />}

                {isFetchNextPageError && !(error.message === "Pro features cannot be accessed by Basic tier user.") && (
                  <div className="flex flex-col items-center">
                    <h1 className="text-error">{BROWSE.NEXT_PAGE_LOAD_ERROR}</h1>
                    <button
                      className="btn mt-2"
                      onClick={() => {
                        fetchNextPage();
                      }}
                    >
                      Try again
                    </button>
                  </div>
                )}

                {data && data.pages.length > 1 && !hasNextPage && (
                  <h1 className="text-accent">{BROWSE.PAGINATION_END}</h1>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
