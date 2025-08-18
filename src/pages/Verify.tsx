import { useEffect } from "react";
import { getAuthenticatedUser } from "../sevices/authentication/authServices";
import { SIGNUP } from "../constants/SIGNUP";
import { useNavigate } from "react-router-dom";

export const Verify = () => {
  const navigate = useNavigate();

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

  return <div className=""></div>;
};
