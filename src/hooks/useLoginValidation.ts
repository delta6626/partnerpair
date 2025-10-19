import { useEffect, useState } from "react";
import type { LoginFormInputs } from "../../shared/types/LoginFormInputs";
import { isValidEmail } from "../utils/isValidEmail";
import { isValidLength } from "../utils/isValidLength";
import { LOGIN } from "../../shared/constants/LOGIN";

export const useLoginValidation = (email: string, password: string, touched: Record<LoginFormInputs, boolean>) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formValid, setFormValid] = useState<boolean>(false);

  useEffect(() => {
    // Reset errors when form is valid

    if (isValidEmail(email) && isValidLength(password, LOGIN.MINIMUM_PASSWORD_LENGTH)) {
      setErrorMessage(null);
      setFormValid(true);
      return;
    } else {
      setFormValid(false);
    }

    // Set appropriate error if form is not valid

    if (touched.email && !isValidEmail(email)) {
      setErrorMessage(LOGIN.EMAIL_INVALID_ERROR);
    } else if (touched.password && !isValidLength(password, LOGIN.MINIMUM_PASSWORD_LENGTH)) {
      setErrorMessage(LOGIN.PASSWORD_LENGTH_ERROR);
    } else {
      setErrorMessage(null);
    }
  }, [email, password, touched]);

  return { errorMessage, setErrorMessage, formValid };
};
