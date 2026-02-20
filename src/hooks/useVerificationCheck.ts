import { useEffect } from "react";
import { getAuthenticatedUser } from "../services/authentication/authServices";
import { useNavigate } from "react-router-dom";

export const useVerificationCheck = (redirectToDashboard = false) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const user = await getAuthenticatedUser();
      if (typeof user === "string") return;

      if (!user.emailVerified) {
        navigate("/verify");
      }

      if (redirectToDashboard) {
        navigate("/dashboard");
      }
    };

    checkUser();
  }, [navigate, redirectToDashboard]);
};
