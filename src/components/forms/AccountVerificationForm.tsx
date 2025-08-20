import { VERIFY } from "../../constants/VERIFY";
import { useInitializeUser } from "../../hooks/useInitializeUser";

export const AccountVerificationForm = () => {
  const { user } = useInitializeUser();

  function handleAccountVerifcation() {}

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
        >
          {VERIFY.SEND_VERIFICATION_MAIL}
        </button>
      </div>
    </div>
  );
};
