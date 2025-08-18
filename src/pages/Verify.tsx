import { useEffect } from "react";
import { getAuthenticatedUser } from "../sevices/authentication/authServices";
import { SIGNUP } from "../constants/SIGNUP";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useUserStore } from "../store/useUserStore";

export const Verify = () => {
  useTheme();
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    const checkUser = async () => {
      const user = await getAuthenticatedUser();
      if (user != SIGNUP.UNAUTHENTICATED) {
        return;
      } else {
        navigate("/signup");
      }
    };

    checkUser();
  }, []);

  console.log(user);

  return (
    <div className="font-inter w-full h-[100vh] bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
      <div className="w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28 text-center">
        <h1 className="font-bold text-4xl">
          Nice to meet you, {user?.basicInfo.firstName}
        </h1>
      </div>
    </div>
  );
};
