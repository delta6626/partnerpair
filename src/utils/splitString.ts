// Splits a string by spaces and returns the item at the specified index, or an empty string if out of bounds

export const splitString = (str: string, index: number): string => {
  const items = str.split(" ");
  return items[index] ?? "";
};
