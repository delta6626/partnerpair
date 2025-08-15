import { SIGNUP } from "../../constants/SIGNUP";

export const SignupForm = () => {
  return (
    <form className="mt-16 fieldset">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <input type="text" className="input" placeholder="First name" />
            <input type="text" className="input" placeholder="Last name" />
          </div>
        </div>

        <div className="flex flex-col">
          <input type="email" className="input w-full" placeholder="Email" />
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
          />
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            className="input w-full"
            placeholder="Confirm password"
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
