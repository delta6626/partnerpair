import { useInitializeUser } from "../../hooks/useInitializeUser";

export const AccountVerificationForm = () => {
  const { user } = useInitializeUser();

  return (
    <div className="w-3xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28 text-center">
      <div className="">
        <h1 className="font-bold text-4xl">
          Nice to meet you, {user?.basicInfo.firstName + "."}
        </h1>
        <h4 className="text-lg text-left mt-16">
          We just need to verify your account. Click the Send Verification Email
          button and check your inbox for a link. Once you click the link, your
          account will be verified and this page will update automatically.
        </h4>
        <button className="btn btn-primary w-full mt-4">
          Send verification mail
        </button>
      </div>
    </div>
  );
};
