import { SIGNUP } from "../constants/SIGNUP";
import type { User } from "../types/User";
import { isValidAge } from "./isValidAge";
import { isValidEmail } from "./isValidEmail";
import { isValidLength } from "./isValidLength";

export const userDataValid = (user: User) => {
  if (!isValidLength(user.basicInfo.firstName, SIGNUP.MINIMUM_FIRST_NAME_LENGTH)) return false;
  if (!isValidLength(user.basicInfo.lastName, SIGNUP.MINIMUM_LAST_NAME_LENGTH)) return false;
  if (!isValidAge(user.basicInfo.dateOfBirth, SIGNUP.MINIMUM_AGE, SIGNUP.MAXIMUM_AGE)) return false;
  if (!isValidEmail(user.basicInfo.email)) return false;
};
