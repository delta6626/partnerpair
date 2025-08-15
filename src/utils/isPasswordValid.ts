import { SIGNUP } from "../constants/SIGNUP";

export const isPasswordValid = (password: string): boolean => {
  return password.length >= SIGNUP.MINIMUM_PASSWORD_LENGTH;
};
