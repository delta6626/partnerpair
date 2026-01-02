import { useState, type ChangeEvent, type FormEvent } from "react";
import { SIGNUP } from "../../../shared/constants/SIGNUP";
import { LOGIN } from "../../../shared/constants/LOGIN";
import { GoogleIcon } from "../../assets/customIcons/GoogleIcon";
import { useLoginValidation } from "../../hooks/useLoginValidation";
import type { LoginFormInputs } from "../../../shared/types/LoginFormInputs";
import { loginUserByEmail, signInWithGoogle } from "../../services/authentication/authServices";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";
import type { UserCredential } from "firebase/auth";
import { useQueryClient } from "@tanstack/react-query";
import { clearStores } from "../../store/clearStores";

export const LoginForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [touched, setTouched] = useState<Record<LoginFormInputs, boolean>>({
    email: false,
    password: false,
  });

  const { errorMessage, setErrorMessage, formValid } = useLoginValidation(email, password, touched);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setTouched((prev) => ({ ...prev, email: true }));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setTouched((prev) => ({ ...prev, password: true }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    clearStores();
    queryClient.clear();
    setLoading(true);

    const userCredentials = await loginUserByEmail(email, password);
    setLoading(false);

    // Error case
    if (typeof userCredentials === "string") {
      setErrorMessage(userCredentials);
      return;
    }

    // Check if authenticated user is verfied.
    if (userCredentials.user.emailVerified) {
      navigate("/dashboard");
    } else {
      navigate("/verify");
    }
  };

  const handleGoogleLogin = async (e: FormEvent) => {
    e.preventDefault();
    clearStores();
    queryClient.clear();
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

      <div className="min-h-6 text-error">{errorMessage && <p>{errorMessage}</p>}</div>

      <div className="">
        <button type="submit" className="btn btn-primary w-full" disabled={loading || !formValid} onClick={handleLogin}>
          {loading ? <Loader /> : LOGIN.LOGIN_BUTTON_TEXT}
        </button>
        <button className="btn btn-neutral w-full mt-2" disabled={loading} onClick={handleGoogleLogin}>
          <GoogleIcon />
          {LOGIN.LOGIN_WITH_GOOGLE_BUTTON_TEXT}
        </button>
      </div>
    </form>
  );
};
