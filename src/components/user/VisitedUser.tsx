import type { ViewerMetaData } from "../../../shared/types/ViewerMetaData";
import { useNavigate } from "react-router-dom";

export const VisitedUser = ({ viewerData }: { viewerData: ViewerMetaData }) => {
  const navigate = useNavigate();
  const viewedAt = new Date(viewerData.viewedAt._seconds * 1000);

  // Format date/time cleanly
  const formattedDate = viewedAt.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleVisitUserProfile = () => {
    navigate(`/user/${viewerData.viewerId}`); // Visit the visited user's profile
  };

  return (
    <div className="flex items-center justify-between p-4 border border-accent rounded-3xl">
      <div className="flex items-center gap-4 cursor-pointer">
        <img
          className="w-15 h-15 rounded-full"
          src={viewerData.viewerProfileImageURL}
          alt={`${viewerData.viewerFirstName} ${viewerData.viewerLastName}`}
        />
        <div>
          <h1>{viewerData.viewerFirstName + " " + viewerData.viewerLastName}</h1>
          <p className="text-accent">Viewed on {formattedDate}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="btn" onClick={handleVisitUserProfile}>
          View Profile
        </button>
        <button className="btn btn-primary">Message</button>
      </div>
    </div>
  );
};
