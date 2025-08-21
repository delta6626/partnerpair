import { useEffect, useState } from "react";
import { isValidEmail } from "../utils/isValidEmail";
import { isValidLength } from "../utils/isValidLength";
import { passwordsMatch } from "../utils/passwordsMatch";
import { SIGNUP } from "../constants/SIGNUP";
import type { SignupFormInputs } from "../types/SignupFormInputs";
import { isValidAge } from "../utils/isValidAge";

export const useSignupValidation = (
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: string,
  password: string,
  confirmedPassword: string,
  touched: Record<SignupFormInputs, boolean>
) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formValid, setFormValid] = useState<boolean>(false);

  useEffect(() => {
    // Reset error message when all fields are valid
    if (
      isValidLength(firstName, SIGNUP.MINIMUM_FIRST_NAME_LENGTH) &&
      isValidLength(lastName, SIGNUP.MINIMUM_LAST_NAME_LENGTH) &&
      isValidEmail(email) &&
      isValidAge(dateOfBirth, SIGNUP.MINIMUM_AGE, SIGNUP.MAXIMUM_AGE) &&
      isValidLength(password, SIGNUP.MINIMUM_PASSWORD_LENGTH) &&
      passwordsMatch(password, confirmedPassword)
    ) {
      setErrorMessage(null); // No errors
      setFormValid(true);
      return;
    } else {
      setFormValid(false);
    }

    // Set appropriate error

    if (
      touched.firstName &&
      !isValidLength(firstName, SIGNUP.MINIMUM_FIRST_NAME_LENGTH)
    ) {
      setErrorMessage(SIGNUP.FIRST_NAME_LENGTH_ERROR);
    } else if (
      touched.lastName &&
      !isValidLength(lastName, SIGNUP.MINIMUM_LAST_NAME_LENGTH)
    ) {
      setErrorMessage(SIGNUP.LAST_NAME_LENGTH_ERROR);
    } else if (touched.email && !isValidEmail(email)) {
      setErrorMessage(SIGNUP.EMAIL_INVALID_ERROR);
    } else if (
      touched.dateOfBirth &&
      !isValidAge(dateOfBirth, SIGNUP.MINIMUM_AGE, SIGNUP.MAXIMUM_AGE)
    ) {
      setErrorMessage(SIGNUP.DATE_OF_BIRTH_ERROR);
    } else if (
      touched.password &&
      !isValidLength(password, SIGNUP.MINIMUM_PASSWORD_LENGTH)
    ) {
      setErrorMessage(SIGNUP.PASSWORD_LENGTH_ERROR);
    } else if (
      touched.confirmPassword &&
      !passwordsMatch(password, confirmedPassword)
    ) {
      setErrorMessage(SIGNUP.PASSWORDS_DO_NOT_MATCH_ERROR);
    } else {
      setErrorMessage(null); // Clear the error if no issue
    }
  }, [firstName, lastName, email, password, confirmedPassword, touched]);

  return { errorMessage, setErrorMessage, formValid };
};
