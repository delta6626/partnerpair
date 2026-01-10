import { MainNavbar } from "../components/navigation/MainNavbar";
import { useTheme } from "../hooks/useTheme";

export const Forum = () => {
  useTheme();

  return (
    <div className="w-full flex flex-col grow min-h-[100vh] font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
      <div className="py-4">
        <MainNavbar />
      </div>
    </div>
  );
};
