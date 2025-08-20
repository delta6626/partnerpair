import { useState } from "react";
import { VERIFY } from "../../constants/VERIFY";
import { useInitializeUser } from "../../hooks/useInitializeUser";
import { sendVerificationMail } from "../../sevices/authentication/authServices";

export const AccountVerificationForm = () => {
  const { user } = useInitializeUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>();

  const handleAccountVerifcation = async () => {
    setLoading(true);

    const sent = await sendVerificationMail();
    setLoading(false);

    console.log(sent);

    if (typeof sent === "string") {
      setEmailError(sent);
      setEmailSent(false);
      return;
    }

    if (sent) {
      setEmailError(null);
      setEmailSent(true);
    }
  };

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
        <p className="min-h-6 text-error mt-2 text-center">{emailError}</p>
      </div>
    </div>
  );
};
