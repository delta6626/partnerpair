import { useEffect, useState } from "react";
import { VERIFY } from "../../constants/VERIFY";
import { useInitializeUser } from "../../hooks/useInitializeUser";
import { sendVerificationMail } from "../../sevices/authentication/authServices";
import { useEmailVerified } from "../../hooks/useEmailVerified";
import { useNavigate } from "react-router-dom";

export const AccountVerificationForm = () => {
  const navigate = useNavigate();

  const { user } = useInitializeUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [checkingForUpdate, setCheckingForUpdate] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>();

  const { emailVerified, error } = useEmailVerified(emailSent ? true : false);

  const handleAccountVerifcation = async () => {
    setLoading(true);

    const sent = await sendVerificationMail();
    setLoading(false);

    console.log(sent);

    if (typeof sent === "string") {
      setStatusMessage(sent);
      setEmailSent(false);
      return;
    }

    if (sent) {
      setEmailSent(true);
      setStatusMessage(VERIFY.CHECKING_FOR_UPDATES);
      setCheckingForUpdate(true);
    }
  };

  useEffect(() => {
    if (emailVerified) {
      setStatusMessage(null);
      setCheckingForUpdate(false);
      navigate("/dashboard");
    }

    if (typeof error === "string") {
      setStatusMessage(error);
    }
  }, [emailVerified, error]);

  useEffect(() => {
    if (user?.basicInfo.verified) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="font-bold text-3xl md:text-4xl text-center">
          {VERIFY.WELCOME_MESSAGE + ", " + user?.basicInfo.firstName + "."}
        </h1>
        <h4 className="text-lg mt-8">{VERIFY.VERIFICATON_INSTRUCTIONS}</h4>
        <button
          className="btn btn-primary w-full mt-6"
          onClick={handleAccountVerifcation}
          disabled={emailSent}
        >
          {loading ? (
            <p className="loading loading-spinner"></p>
          ) : emailSent ? (
            VERIFY.VERIFICAITON_MAIL_SENT
          ) : (
            VERIFY.SEND_VERIFICATION_MAIL
          )}
        </button>
        <div className="">
          <p
            className={`${
              statusMessage != VERIFY.CHECKING_FOR_UPDATES ? "text-error" : ""
            } min-h-6 mt-2 text-center`}
          >
            {statusMessage}
          </p>{" "}
          {emailSent && checkingForUpdate ? (
            <p className="loading loading-spinner"></p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
