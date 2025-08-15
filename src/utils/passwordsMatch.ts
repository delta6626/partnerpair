export const passwordsMatch = (
  password: string,
  confirmedPassword: string
): boolean => {
  return password === confirmedPassword;
};
