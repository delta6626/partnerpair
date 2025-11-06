import type { ProfileInsightsTimePeriod } from "../../../shared/types/ProfileInsightsTimePeriod";
import type { ViewerMetaData } from "../../../shared/types/ViewerMetaData";

export const VisitedUserCollection = ({
  visitedUsers,
  timePeriod,
}: {
  visitedUsers: ViewerMetaData[];
  timePeriod: ProfileInsightsTimePeriod;
}) => {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  let filteredVisitedUsers: ViewerMetaData[] = [];

  switch (timePeriod) {
    case "last24Hours": {
      const startTime = now - 24 * 60 * 60 * 1000;
      filteredVisitedUsers = visitedUsers.filter(
        (v) => v.viewedAt.toMillis() >= startTime && v.viewedAt.toMillis() <= now
      );
      break;
    }
    case "last7Days": {
      const startTime = now - 7 * day;
      filteredVisitedUsers = visitedUsers.filter(
        (v) => v.viewedAt.toMillis() >= startTime && v.viewedAt.toMillis() <= now
      );
      break;
    }
    case "last30Days": {
      const startTime = now - 30 * day;
      filteredVisitedUsers = visitedUsers.filter(
        (v) => v.viewedAt.toMillis() >= startTime && v.viewedAt.toMillis() <= now
      );
      break;
    }
    case "last90Days": {
      const startTime = now - 90 * day;
      filteredVisitedUsers = visitedUsers.filter(
        (v) => v.viewedAt.toMillis() >= startTime && v.viewedAt.toMillis() <= now
      );
      break;
    }
    default:
      filteredVisitedUsers = visitedUsers;
  }

  return <div className=""></div>;
};
