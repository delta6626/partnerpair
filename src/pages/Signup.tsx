import { useEffect } from "react";
import { SignupForm } from "../components/forms/SignupForm";
import { Navbar } from "../components/navigation/Navbar";
import { SIGNUP } from "../constants/SIGNUP";
import { getAuthenticatedUser } from "../services/authentication/authServices";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const user = await getAuthenticatedUser();
      if (typeof user === "string") return;

      if (user.emailVerified) {
        navigate("/dashboard");
      } else {
        navigate("/verify");
      }
    };

    checkUser();
  }, []);

  return (
    <div className="font-inter w-full h-[100vh] bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28 flex flex-col">
      <div className="py-4">
        <Navbar />
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg">
          <div className="w-full flex flex-col items-center">
            <h1 className="font-bold text-3xl md:text-4xl text-center">{SIGNUP.GREETING_TEXT}</h1>

            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};
