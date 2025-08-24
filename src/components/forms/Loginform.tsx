import { useState } from "react";
import { SIGNUP } from "../../constants/SIGNUP";
import { LOGIN } from "../../constants/LOGIN";

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form className="w-full mt-8 fieldset">
      <div className="flex flex-col gap-2">
        <input
          type="email"
          className="input w-full"
          placeholder="Email"
          maxLength={SIGNUP.MAXIMUM_EMAIL_LENGTH}
          value={email}
        />
        <input
          type="password"
          className="input w-full"
          placeholder="Password"
          maxLength={SIGNUP.MAXIMUM_PASSWORD_LENGTH}
          value={password}
        />
      </div>

      <div className="min-h-6 text-error">
        {"errorMessage && <p>{errorMessage}</p>"}
      </div>

      <div className="">
        <button type="submit" className="btn btn-primary w-full">
          {LOGIN.LOGIN_BUTTON_TEXT}
        </button>
      </div>
    </form>
  );
};
