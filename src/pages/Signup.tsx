import { SignupForm } from "../components/forms/SignupForm";
import { Navbar } from "../components/navigation/Navbar";
import { SIGNUP } from "../../shared/constants/SIGNUP";
import { useVerificationCheck } from "../hooks/useVerificationCheck";
import { useTheme } from "../hooks/useTheme";

export const Signup = () => {
  useTheme();
  useVerificationCheck();

  return (
    <div className="font-inter w-full min-h-[100vh] bg-base-300 paddingContainer flex flex-col">
      <div className="py-4">
        <Navbar />
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg">
          <div className="w-full flex flex-col items-center">
            <h1 className="font-semibold text-3xl md:text-4xl text-center">{SIGNUP.GREETING_TEXT}</h1>

            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};
