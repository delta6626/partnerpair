export const isValidLength = (value: string, minimumLength: number): boolean => {
  return value.trim().length >= minimumLength;
};
