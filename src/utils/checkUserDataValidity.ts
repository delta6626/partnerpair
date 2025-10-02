import { SIGNUP } from "../constants/SIGNUP";
import type { User } from "../types/User";
import { isValidEmail } from "./isValidEmail";
import { isValidLength } from "./isValidLength";

export const checkUserDataValidity = (user: User) => {
  if (!isValidLength(user.basicInfo.firstName, SIGNUP.MINIMUM_FIRST_NAME_LENGTH)) return false;
  if (!isValidLength(user.basicInfo.lastName, SIGNUP.MINIMUM_LAST_NAME_LENGTH)) return false;
  if (isValidEmail(user.basicInfo.email)) return false;
};
