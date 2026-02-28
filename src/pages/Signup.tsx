import { SignupForm } from "../components/forms/SignupForm";
import { Navbar } from "../components/navigation/Navbar";
import { SIGNUP } from "../../shared/constants/SIGNUP";
import { useVerificationCheck } from "../hooks/useVerificationCheck";
import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";

export const Signup = () => {
  useTheme();
  useVerificationCheck(true);

  return (
    <div className="font-inter w-full min-h-[100vh] bg-base-300 paddingContainer flex flex-col">
      <div className="py-4">
        <Navbar hideHomePageSpecificLinks={true} />
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg">
          <div className="w-full flex flex-col items-center">
            <h1 className="font-semibold text-3xl md:text-4xl text-center">{SIGNUP.GREETING_TEXT}</h1>
            <SignupForm />
            <p className="mt-2">
              By signing up, you agree to our{" "}
              <Link className="text-primary" to={"/terms-of-service"}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="text-primary" to={"/privacy-policy"}>
                Privacy Policy.
              </Link>
            </p>

            <p className="mt-2">
              Already have an account?{" "}
              <Link className="text-primary" to={"/login"}>
                Log In.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
