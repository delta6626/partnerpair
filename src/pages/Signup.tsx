import { Navbar } from "../components/navigation/Navbar";
import { SIGNUP } from "../constants/SIGNUP";

export const Signup = () => {
  return (
    <div className="font-inter w-full h-[100vh] bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
      <div className="py-4">
        <Navbar />
      </div>

      <div className="w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
        <div className="w-full flex flex-col items-center">
          <h1 className="font-bold text-4xl text-center">
            {SIGNUP.greetingText}
          </h1>
          <form className="mt-16 fieldset">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input"
                    placeholder="First name"
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                />
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
        </div>
      </div>
    </div>
  );
};
