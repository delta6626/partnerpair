import type { Timestamp } from "firebase-admin/firestore";

export interface ViewerMetaData {
  viewerId: string;
  viewedAt: Timestamp;
}
