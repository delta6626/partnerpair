import type { ProfileInsightsTimePeriod } from "../../../shared/types/ProfileInsightsTimePeriod";
import type { ViewerMetaData } from "../../../shared/types/ViewerMetaData";
import { VisitedUser } from "./VisitedUser";

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

  return (
    <div className="w-full flex flex-col gap-4">
      {filteredVisitedUsers.map((visitedUser, index) => {
        return <VisitedUser key={index} viewerData={visitedUser} />;
      })}
    </div>
  );
};
