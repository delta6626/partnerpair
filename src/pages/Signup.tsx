import { Navbar } from "../components/navigation/Navbar";
import { SIGNUP } from "../constants/SIGNUP";

export const Signup = () => {
  return (
    <div className="font-inter w-full h-[100vh] bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
      <div className="py-4">
        <Navbar />
      </div>

      <div className="pt-16 w-full flex flex-col items-center">
        <h1 className="font-bold text-4xl">{SIGNUP.greeting}</h1>
        <form className="mt-16 w-2/8 fieldset">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <div className="flex gap-2">
                <input type="text" className="input" placeholder="First name" />
                <input type="text" className="input" placeholder="Last name" />
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
            <div className="mt-2">
              <button className="btn btn-primary w-full">Continue</button>
            </div>
            <div className="mt-2">
              <p>
                By signing up, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
