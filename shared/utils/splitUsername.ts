// Splits a string on the first space and returns the item at the specified index.
// If there's no space, returns the whole string for index 0, and empty string for index 1.
export const splitUsername = (str: string, index: number): string => {
  const firstSpace = str.indexOf(" ");

  if (firstSpace === -1) {
    // No space found
    return index === 0 ? str : "";
  }

  if (index === 0) return str.slice(0, firstSpace); // first name
  if (index === 1) return str.slice(firstSpace + 1); // rest of the name

  return ""; // index out of bounds
};
