import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { SIGNUP } from "../../../shared/constants/SIGNUP";
import type { SignupFormInputs } from "../../../shared/types/SignupFormInputs";
import { useSignupValidation } from "../../hooks/useSignupValidation";
import { GoogleIcon } from "../../assets/customIcons/GoogleIcon";
import { createUserByEmail, signInWithGoogle } from "../../services/authentication/authServices";
import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";
import type { UserCredential } from "firebase/auth";

export const SignupForm = () => {
  const navigate = useNavigate();

  const { setUser } = useUserStore();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [touched, setTouched] = useState<Record<SignupFormInputs, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    dateOfBirth: false,
    password: false,
    confirmPassword: false,
  });

  const { errorMessage, setErrorMessage, formValid } = useSignupValidation(
    firstName,
    lastName,
    email,
    dateOfBirth,
    password,
    confirmedPassword,
    touched
  );

  // Unified change event handler for all inputs
  const handleInputFieldChange = (inputElement: SignupFormInputs, event: ChangeEvent<HTMLInputElement>) => {
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
      case "dateOfBirth":
        setDateOfBirth(event.target.value);
        setTouched((prev) => ({ ...prev, dateOfBirth: true }));
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

    // Authenticate the user and store them in Firestore.
    const result = await createUserByEmail(email.trim(), password, firstName.trim(), lastName.trim(), dateOfBirth);

    setLoading(false);

    if (typeof result === "string") {
      setErrorMessage(result);
    } else {
      setUser(result);
    }

    // Proceed to email verification on success
    navigate("/verify");
  };

  const handleGoogleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userCredentials: UserCredential | string = await signInWithGoogle();
    setLoading(false);

    // Error case
    if (typeof userCredentials === "string") {
      setErrorMessage(userCredentials);
      return;
    }

    // User successfully signed in and verfied
    navigate("/dashboard");
  };

  // Focus on the first form input field
  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      input.focus();
    }
  }, []);

  return (
    <form className="w-full mt-8 fieldset">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              className="input w-full"
              placeholder="First name"
              maxLength={SIGNUP.MAXIMUM_FIRST_NAME_LENGTH}
              value={firstName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleInputFieldChange("firstName", e);
              }}
            />
            <input
              type="text"
              className="input w-full"
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
            type="date"
            className="input w-full"
            placeholder="Date of birth"
            value={dateOfBirth}
            min={"1900-01-01"}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleInputFieldChange("dateOfBirth", e);
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

        <div className="min-h-6 text-error">{errorMessage && <p>{errorMessage}</p>}</div>

        <div className="">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!formValid || loading}
            onClick={handleSignup}
          >
            {loading ? <Loader /> : SIGNUP.SIGNUP_BUTTON_TEXT}
          </button>
          <button className="btn btn-neutral mt-2 w-full" onClick={handleGoogleSignup} disabled={loading}>
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
