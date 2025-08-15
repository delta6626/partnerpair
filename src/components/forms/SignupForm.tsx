import { useEffect, useState, type ChangeEvent } from "react";
import { isNotEmpty } from "../../utils/isNotEmpty";
import { isValidEmail } from "../../utils/isValidEmail";
import { isPasswordValid } from "../../utils/isPasswordValid";
import { passwordsMatch } from "../../utils/passwordsMatch";
import { SIGNUP } from "../../constants/SIGNUP";
import type { SignupFormErrors } from "../../types/SignupFormErrors";

export const SignupForm = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");

  const [formError, setFormError] = useState<SignupFormErrors>({
    firstName: { error: false, errorMessage: "" },
    lastName: { error: false, errorMessage: "" },
    email: { error: false, errorMessage: "" },
    password: { error: false, errorMessage: "" },
    confirmedPassword: { error: false, errorMessage: "" },
  });
  const [formDataValid, setFormDataValid] = useState<boolean>(false);

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleConfirmedPasswordChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setConfirmedPassword(e.target.value);
  };

  useEffect(() => {
    const errors: SignupFormErrors = {
      firstName: { error: false, errorMessage: "" },
      lastName: { error: false, errorMessage: "" },
      email: { error: false, errorMessage: "" },
      password: { error: false, errorMessage: "" },
      confirmedPassword: { error: false, errorMessage: "" },
    };

    if (!isNotEmpty(firstName)) {
      errors.firstName = {
        error: true,
        errorMessage: "First name cannot be empty",
      };
    }
    if (!isNotEmpty(lastName)) {
      errors.lastName = {
        error: true,
        errorMessage: "Last name cannot be empty",
      };
    }
    if (!isNotEmpty(email)) {
      errors.email = { error: true, errorMessage: "Email cannot be empty" };
    } else if (!isValidEmail(email)) {
      errors.email = { error: true, errorMessage: "Email is invalid" };
    }
    if (!isPasswordValid(password)) {
      errors.password = {
        error: true,
        errorMessage: "Password must be at least 8 characters",
      };
    }
    if (!passwordsMatch(password, confirmedPassword)) {
      errors.confirmedPassword = {
        error: true,
        errorMessage: "Passwords do not match",
      };
    }

    setFormError(errors);
    setFormDataValid(Object.values(errors).every((field) => !field.error));
  }, [firstName, lastName, email, password, confirmedPassword]);

  return (
    <form className="mt-16 fieldset">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <input
              type="text"
              className="input"
              placeholder="First name"
              maxLength={SIGNUP.MAXIMUM_FIRST_NAME_LENGTH}
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <input
              type="text"
              className="input"
              placeholder="Last name"
              maxLength={SIGNUP.MAXIMUM_LAST_NAME_LENGTH}
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            maxLength={SIGNUP.MAXIMUM_EMAIL_LENGTH}
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
            maxLength={SIGNUP.MAXIMUM_PASSWORD_LENGTH}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            className="input w-full"
            placeholder="Confirm password"
            maxLength={SIGNUP.MAXIMUM_PASSWORD_LENGTH}
            value={confirmedPassword}
            onChange={handleConfirmedPasswordChange}
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!formDataValid}
          >
            {SIGNUP.SIGNUP_BUTTON_TEXT}
          </button>
          <button className="btn mt-2 w-full">
            {SIGNUP.SIGNUP_WITH_GOOGLE_BUTTON_TEXT}
          </button>
        </div>
        <div className="mt-4">
          <p>{SIGNUP.TOS_TEXT}</p>
        </div>
      </div>
    </form>
  );
};
