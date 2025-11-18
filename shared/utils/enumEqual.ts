export const enumEqual = (a: unknown, b: unknown) => {
  if (!a || !b) return 0;
  return a === b ? 1 : 0;
};
