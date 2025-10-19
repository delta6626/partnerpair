import { useEffect, useState } from "react";
import { getVerificationStatus } from "../services/authentication/authServices";
import { VERIFY } from "../constants/VERIFY";

export const useEmailVerified = (initiate: boolean) => {
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initiate) return;

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
  }, [initiate]);

  return { emailVerified, error };
};
