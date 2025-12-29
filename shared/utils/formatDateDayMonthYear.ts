import type { Timestamp } from "firebase/firestore";

export const formatDateDayMonthYear = (date: Date | Timestamp): string => {
  const jsDate = date instanceof Date ? date : date.toDate();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return jsDate.toLocaleDateString("en-US", options);
};
