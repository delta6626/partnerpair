import { useEffect, useState } from "react";
import { getVerificationStatus } from "../sevices/authentication/authServices";
import { VERIFY } from "../constants/VERIFY";

export const useEmailVerified = () => {
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkVerification = async () => {
      const status = await getVerificationStatus();
      if (typeof status === "string") {
        setError(status);
        setEmailVerified(false);
      } else {
        setError(null);
        setEmailVerified(status);
      }
    };

    checkVerification();

    const interval = setInterval(checkVerification, VERIFY.POLL_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return { emailVerified, error };
};
