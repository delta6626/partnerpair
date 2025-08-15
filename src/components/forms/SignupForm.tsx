import { useState } from "react";
import { SIGNUP } from "../../constants/SIGNUP";

export const SignupForm = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");

  return (
    <form className="mt-16 fieldset">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <input
              type="text"
              className="input"
              placeholder="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              type="text"
              className="input"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            className="input w-full"
            placeholder="Confirm password"
            value={confirmedPassword}
            onChange={(e) => {
              setConfirmedPassword(e.target.value);
            }}
          />
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary w-full">
            {SIGNUP.signupButtonText}
          </button>
          <button className="btn mt-2 w-full">
            {SIGNUP.signupWithGoogleButtonText}
          </button>
        </div>
        <div className="mt-4">
          <p>{SIGNUP.tosText}</p>
        </div>
      </div>
    </form>
  );
};
