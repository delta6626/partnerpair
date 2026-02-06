import { ContactRound } from "lucide-react";
import type { ViewerMetaData } from "../../../shared/types/ViewerMetaData";
import { useNavigate } from "react-router-dom";
import { useInitializeUser } from "../../hooks/useInitializeUser";
import { MessageUser } from "../messaging/MessageUser";

export const VisitedUser = ({ viewerData }: { viewerData: ViewerMetaData }) => {
  const navigate = useNavigate();
  const { user } = useInitializeUser();
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
    <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between p-4 border border-base-100 rounded-3xl">
      <div className="flex items-center gap-4">
        <img
          className="w-15 h-15 rounded-full"
          src={viewerData.viewerProfileImageURL}
          alt={`${viewerData.viewerFirstName} ${viewerData.viewerLastName}`}
        />
        <div>
          <h1 className="flex gap-2">
            {viewerData.viewerFirstName + " " + viewerData.viewerLastName}
            {user?.basicInfo.contactList.includes(viewerData.viewerId) ? (
              <div className="tooltip tooltip-top" data-tip={viewerData.viewerFirstName + " is a contact"}>
                <ContactRound className="text-accent" size={20} />
              </div>
            ) : (
              ""
            )}
          </h1>
          <p className="text-accent">Viewed on {formattedDate}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="btn flex-1 min-w-fit" onClick={handleVisitUserProfile}>
          View Profile
        </button>
        <MessageUser otherParticipantId={viewerData.viewerId} className="flex-1" />
      </div>
    </div>
  );
};
