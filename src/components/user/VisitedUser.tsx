import type { ViewerMetaData } from "../../../shared/types/ViewerMetaData";

export const VisitedUser = ({ viewerData }: { viewerData: ViewerMetaData }) => {
  return (
    <div className="p-4 border border-accent rounded-2xl">
      <div className="flex items-center gap-4">
        <img className="w-15 h-15 rounded-full" src={viewerData.viewerProfileImageURL}></img>
        <h1 className="">{viewerData.viewerFirstName + " " + viewerData.viewerLastName}</h1>
      </div>
    </div>
  );
};
