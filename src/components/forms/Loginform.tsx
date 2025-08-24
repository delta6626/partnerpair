import { useState, type ChangeEvent } from "react";
import { SIGNUP } from "../../constants/SIGNUP";
import { LOGIN } from "../../constants/LOGIN";
import { GoogleIcon } from "../../assets/customIcons/GoogleIcon";
import { useLoginValidation } from "../../hooks/useLoginValidation";
import type { LoginFormInputs } from "../../types/LoginFormInputs";

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [touched, setTouched] = useState<Record<LoginFormInputs, boolean>>({
    email: false,
    password: false,
  });

  const { errorMessage, setErrorMessage, formValid } = useLoginValidation(
    email,
    password,
    touched
  );

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setTouched((prev) => ({ ...prev, email: true }));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setTouched((prev) => ({ ...prev, password: true }));
  };

  const handleLogin = () => {};

  const handleGoogleLogin = () => {};

  return (
    <form className="w-full mt-8 fieldset">
      <div className="flex flex-col gap-2">
        <input
          type="email"
          className="input w-full"
          placeholder="Email"
          maxLength={SIGNUP.MAXIMUM_EMAIL_LENGTH}
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          className="input w-full"
          placeholder="Password"
          maxLength={SIGNUP.MAXIMUM_PASSWORD_LENGTH}
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <div className="min-h-6 text-error">
        {"errorMessage && <p>{errorMessage}</p>"}
      </div>

      <div className="">
        <button
          type="submit"
          className="btn btn-primary w-full"
          onClick={handleLogin}
        >
          {LOGIN.LOGIN_BUTTON_TEXT}
        </button>
        <button
          className="btn btn-neutral w-full mt-2"
          onClick={handleGoogleLogin}
        >
          <GoogleIcon />
          {LOGIN.LOGIN_WITH_GOOGLE_BUTTON_TEXT}
        </button>
      </div>
    </form>
  );
};
