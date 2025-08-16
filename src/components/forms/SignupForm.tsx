import { useState, type ChangeEvent } from "react";
import { SIGNUP } from "../../constants/SIGNUP";
import type { SignupFormInputs } from "../../types/SignupFormInputs";

export const SignupForm = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");

  const handleInputFieldChange = (
    inputElement: SignupFormInputs,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    switch (inputElement) {
      case "firstName":
        setFirstName(event.target.value);
        break;
      case "lastName":
        setLastName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "confirmPassword":
        setConfirmedPassword(event.target.value);
        break;
    }
  };

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
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleInputFieldChange("firstName", e);
              }}
            />
            <input
              type="text"
              className="input"
              placeholder="Last name"
              maxLength={SIGNUP.MAXIMUM_LAST_NAME_LENGTH}
              value={lastName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleInputFieldChange("lastName", e);
              }}
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleInputFieldChange("email", e);
            }}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
            maxLength={SIGNUP.MAXIMUM_PASSWORD_LENGTH}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleInputFieldChange("password", e);
            }}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            className="input w-full"
            placeholder="Confirm password"
            maxLength={SIGNUP.MAXIMUM_PASSWORD_LENGTH}
            value={confirmedPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleInputFieldChange("confirmPassword", e);
            }}
          />
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary w-full">
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
