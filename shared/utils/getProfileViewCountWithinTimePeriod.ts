// @ts-expect-error : This type is shared by the server and the client, but firebase-admin/firestore is not accessible from the client.
import type { DocumentData } from "firebase-admin/firestore";
import type { ViewerMetaData } from "../types/ViewerMetaData";

export const getProfileViewCountWithinTimePeriod = (documentArray: DocumentData[], timePeriod: number) => {
  const currentDate = new Date();
  let viewCount = 0;

  documentArray.forEach((document) => {
    const viewerData: ViewerMetaData = document.data() as ViewerMetaData;
    const viewDate = viewerData.viewedAt.toDate();

    const diffInMs = currentDate.getTime() - viewDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays <= timePeriod) viewCount++;
  });

  return viewCount;
};
