import { useState, type ChangeEvent, type FormEvent } from "react";
import { SIGNUP } from "../../constants/SIGNUP";
import type { SignupFormInputs } from "../../types/SignupFormInputs";
import { useSignupValidation } from "../../hooks/useSignupValidation";
import { GoogleIcon } from "../../assets/customIcons/GoogleIcon";
import { createUserByEmail } from "../../sevices/authentication/authServices";
import type { User } from "../../types/User";

export const SignupForm = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [touched, setTouched] = useState<Record<SignupFormInputs, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const { errorMessage, setErrorMessage, formValid } = useSignupValidation(
    firstName,
    lastName,
    email,
    password,
    confirmedPassword,
    touched
  );

  const handleInputFieldChange = (
    inputElement: SignupFormInputs,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    switch (inputElement) {
      case "firstName":
        setFirstName(event.target.value);
        setTouched((prev) => ({ ...prev, firstName: true }));
        break;
      case "lastName":
        setLastName(event.target.value);
        setTouched((prev) => ({ ...prev, lastName: true }));
        break;
      case "email":
        setEmail(event.target.value);
        setTouched((prev) => ({ ...prev, email: true }));
        break;
      case "password":
        setPassword(event.target.value);
        setTouched((prev) => ({ ...prev, password: true }));
        break;
      case "confirmPassword":
        setConfirmedPassword(event.target.value);
        setTouched((prev) => ({ ...prev, confirmPassword: true }));
        break;
    }
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await createUserByEmail(
      email,
      password,
      firstName,
      lastName
    );

    setLoading(false);

    if (typeof result === "string") {
      setErrorMessage(result);
    } else {
      console.log("user created");
    }
  };

  const handleGoogleSignup = (e: FormEvent) => {
    e.preventDefault();
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

        <div className="min-h-6 text-error">
          {errorMessage && <p>{errorMessage}</p>}
        </div>

        <div className="">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!formValid || loading}
            onClick={handleSignup}
          >
            {loading ? (
              <p className="loading loading-spinner"></p>
            ) : (
              SIGNUP.SIGNUP_BUTTON_TEXT
            )}
          </button>
          <button
            className="btn btn-neutral mt-2 w-full"
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            <GoogleIcon />
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
