import { Footer } from "../components/navigation/Footer";
import { Navbar } from "../components/navigation/Navbar";
import { useTheme } from "../hooks/useTheme";

export const PrivacyPolicy = () => {
  useTheme();

  return (
    <>
      <div className="w-full min-h-[100vh] flex flex-col font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
        <div className="py-4">
          <Navbar />
        </div>

        <div className="flex flex-col items-center">
          <div className="py-8 w-full max-w-200 mt-4">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-accent">Last Updated: January 17, 2026</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
