import { SIGNUP } from "../constants/SIGNUP";
import type { User } from "../types/User";
import { isValidAge } from "./isValidAge";
import { isValidEmail } from "./isValidEmail";
import { isValidLength } from "./isValidLength";
import { isValidProfileLink } from "./isValidProfileLink";

export const basicUserDataValid = (user: User) => {
  if (!isValidLength(user.basicInfo.firstName, SIGNUP.MINIMUM_FIRST_NAME_LENGTH)) return false;
  if (!isValidLength(user.basicInfo.lastName, SIGNUP.MINIMUM_LAST_NAME_LENGTH)) return false;
  if (!isValidAge(user.basicInfo.dateOfBirth, SIGNUP.MINIMUM_AGE, SIGNUP.MAXIMUM_AGE)) return false;
  if (!isValidEmail(user.basicInfo.email)) return false;
  if (!isValidProfileLink("linkedin", user.socialLinks.linkedin)) return false;
  if (!isValidProfileLink("twitter", user.socialLinks.twitter)) return false;
  if (!isValidProfileLink("github", user.socialLinks.github)) return false;
  if (!isValidProfileLink("website", user.socialLinks.website)) return false;

  return true;
};
