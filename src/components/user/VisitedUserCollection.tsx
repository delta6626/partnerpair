import { PROFILE_INSIGHTS } from "../../../shared/constants/PROFILE_INSIGHTS";
import type { ProfileInsightsTimePeriod } from "../../../shared/types/ProfileInsightsTimePeriod";
import type { ProfileViewFilter } from "../../../shared/types/ProfileViewFilter";
import type { ViewerMetaData } from "../../../shared/types/ViewerMetaData";
import { VisitedUser } from "./VisitedUser";

export const VisitedUserCollection = ({
  visitedUsers,
  timePeriod,
  viewFilter,
}: {
  visitedUsers: ViewerMetaData[];
  timePeriod: ProfileInsightsTimePeriod;
  viewFilter: ProfileViewFilter;
}) => {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  let filteredVisitedUsers: ViewerMetaData[] = [];

  const getStartTime = () => {
    switch (timePeriod) {
      case "last24Hours":
        return now - 1 * day;
      case "last7Days":
        return now - 7 * day;
      case "last30Days":
        return now - 30 * day;
      case "last90Days":
        return now - 90 * day;
      default:
        return 0;
    }
  };

  const startTime = getStartTime();

  filteredVisitedUsers = visitedUsers.filter((v) => {
    const viewedAtMillis = v.viewedAt._seconds * 1000 + v.viewedAt._nanoseconds / 1_000_000;
    return viewedAtMillis >= startTime && viewedAtMillis <= now;
  });

  filteredVisitedUsers.sort(
    (a, b) =>
      b.viewedAt._seconds * 1000 +
      b.viewedAt._nanoseconds / 1_000_000 -
      (a.viewedAt._seconds * 1000 + a.viewedAt._nanoseconds / 1_000_000)
  );

  const filteredVisitorsUnique = Array.from(new Map(filteredVisitedUsers.map((v) => [v.viewerId, v])).values());

  if (viewFilter === "allViews" && filteredVisitedUsers.length === 0) {
    return (
      <div className="w-full flex grow-1 items-center justify-center gap-4">
        <p className="text-accent">{PROFILE_INSIGHTS.NO_VIEWS}</p>
      </div>
    );
  } else if (viewFilter === "allViews" && filteredVisitedUsers.length != 0) {
    return (
      <div className="w-full flex flex-col gap-4 mb-8">
        {filteredVisitedUsers.map((visitedUser, index) => {
          return <VisitedUser key={index} viewerData={visitedUser} />;
        })}
      </div>
    );
  }

  if (viewFilter === "uniqueViews" && filteredVisitorsUnique.length === 0) {
    return (
      <div className="w-full flex grow-1 items-center justify-center gap-4">
        <p className="text-accent">{PROFILE_INSIGHTS.NO_VIEWS}</p>
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col gap-4 mb-8">
        {filteredVisitorsUnique.map((visitedUser, index) => {
          return <VisitedUser key={index} viewerData={visitedUser} />;
        })}
      </div>
    );
  }
};
