import { useEffect, useState } from "react";
import { VERIFY } from "../../../shared/constants/VERIFY";
import { useInitializeUser } from "../../hooks/useInitializeUser";
import { sendVerificationMail } from "../../services/authentication/authServices";
import { useEmailVerified } from "../../hooks/useEmailVerified";
import { useNavigate } from "react-router-dom";
import { setVerificationStatus } from "../../services/userProfile/userProfileServices";
import { useUserStore } from "../../store/useUserStore";
import { Loader } from "../Loader";

export const AccountVerificationForm = () => {
  const navigate = useNavigate();

  const { user } = useInitializeUser();
  const { setUser } = useUserStore();

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
    if (!user) return;

    const handleVerification = async () => {
      if (emailVerified) {
        const result = await setVerificationStatus(true);

        if (typeof result === "string") {
          setStatusMessage(VERIFY.DOCUMENT_UPDATE_FAILED);
        } else {
          setUser({
            ...user,
            basicInfo: { ...user.basicInfo, verified: true },
          });
          setStatusMessage(null);
          setCheckingForUpdate(false);
          navigate("/dashboard");
        }
      }

      if (typeof error === "string") {
        setStatusMessage(error);
      }
    };

    handleVerification();
  }, [emailVerified, error, user, navigate]);

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
        <button className="btn btn-primary w-full mt-6" onClick={handleAccountVerifcation} disabled={emailSent}>
          {loading ? <Loader /> : emailSent ? VERIFY.VERIFICAITON_MAIL_SENT : VERIFY.SEND_VERIFICATION_MAIL}
        </button>
        <div className="flex flex-row items-center justify-center gap-2">
          <p className={`${statusMessage != VERIFY.CHECKING_FOR_UPDATES ? "text-error" : ""} min-h-6 mt-2 text-center`}>
            {statusMessage}
          </p>{" "}
          {emailSent && checkingForUpdate ? <Loader /> : ""}
        </div>
      </div>
    </div>
  );
};
