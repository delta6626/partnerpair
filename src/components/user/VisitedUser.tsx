import type { ViewerMetaData } from "../../../shared/types/ViewerMetaData";

export const VisitedUser = ({ viewerData }: { viewerData: ViewerMetaData }) => {
  const viewedAt = new Date(viewerData.viewedAt._seconds * 1000);

  // Format date/time cleanly
  const formattedDate = viewedAt.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-4 border border-accent rounded-3xl">
      <div className="flex items-center gap-4">
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

      <div className="">
        <button className="btn">Add to Contacts</button>
        <button className="btn btn-primary">Message</button>
      </div>
    </div>
  );
};
