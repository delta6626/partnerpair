import { useEffect, useState } from "react";
import { isValidEmail } from "../utils/isValidEmail";
import { isValidLength } from "../utils/isValidLength";
import { passwordsMatch } from "../utils/passwordsMatch";
import { SIGNUP } from "../constants/SIGNUP";
import type { SignupFormInputs } from "../types/SignupFormInputs";

export const useSignupValidation = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmedPassword: string,
  touched: Record<SignupFormInputs, boolean>
) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Reset error message when all fields are valid
    if (
      isValidLength(firstName, 5) &&
      isValidLength(lastName, 5) &&
      isValidEmail(email) &&
      isValidLength(password, SIGNUP.MINIMUM_PASSWORD_LENGTH) &&
      passwordsMatch(password, confirmedPassword)
    ) {
      setErrorMessage(null); // No errors
      return;
    }

    // Set appropriate error

    if (touched.firstName && !isValidLength(firstName, 5)) {
      setErrorMessage("First name must be at least 5 characters.");
    } else if (touched.lastName && !isValidLength(lastName, 5)) {
      setErrorMessage("Last name must be at least 5 characters.");
    } else if (touched.email && !isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
    } else if (
      touched.password &&
      !isValidLength(password, SIGNUP.MINIMUM_PASSWORD_LENGTH)
    ) {
      setErrorMessage(
        `Password must be at least ${SIGNUP.MINIMUM_PASSWORD_LENGTH} characters.`
      );
    } else if (
      touched.confirmPassword &&
      !passwordsMatch(password, confirmedPassword)
    ) {
      setErrorMessage("Passwords do not match.");
    } else {
      setErrorMessage(null); // Clear the error if no issue
    }
  }, [firstName, lastName, email, password, confirmedPassword, touched]);

  return { errorMessage, setErrorMessage };
};
