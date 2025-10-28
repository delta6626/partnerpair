import type { Timestamp } from "firebase/firestore";

export interface ViewerMetaData {
  viewerId: string;
  viewedAt: Timestamp;
}
