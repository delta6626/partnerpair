import type { Timestamp } from "firebase/firestore";

export const formatDate = (date: Date | Timestamp, options: Intl.DateTimeFormatOptions): string => {
  const jsDate = date instanceof Date ? date : date.toDate();
  return jsDate.toLocaleDateString("en-US", options);
};
