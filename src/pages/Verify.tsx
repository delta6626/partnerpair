import { AccountVerificationForm } from "../components/forms/AccountVerificationForm";
import { Navbar } from "../components/navigation/Navbar";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";

export const Verify = () => {
  useTheme();

  const { loading } = useInitializeUser();

  return (
    <div className="font-inter w-full h-[100vh] bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28 flex flex-col">
      <div className="py-4">
        <Navbar />
      </div>

      {loading ? (
        <p className="loading loading-spinner"></p>
      ) : (
        <AccountVerificationForm />
      )}
    </div>
  );
};
