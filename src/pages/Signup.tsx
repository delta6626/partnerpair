import { SignupForm } from "../components/forms/SignupForm";
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
          <SignupForm />
        </div>
      </div>
    </div>
  );
};
