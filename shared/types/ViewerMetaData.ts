// @ts-expect-error : This type is shared by the server and the client, but firebase-admin/firestore is not accessible from the client.
import type { Timestamp } from "firebase-admin/firestore";

export interface ViewerMetaData {
  viewerId: string;
  viewedAt: Timestamp;
  viewerFirstName: string;
  viewerLastName: string;
  viewerProfileImageURL: string;
}
