import { AccountVerificationForm } from "../components/forms/AccountVerificationForm";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/navigation/Navbar";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";

export const Verify = () => {
  useTheme();

  const { loading } = useInitializeUser();

  return (
    <div className="font-inter w-full min-h-[100vh] bg-base-300 paddingContainer flex flex-col">
      <div className="py-4">
        <Navbar />
      </div>

      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <AccountVerificationForm />
      )}
    </div>
  );
};
