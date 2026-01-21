import { MainNavbar } from "../components/navigation/MainNavbar";
import { useTheme } from "../hooks/useTheme";

export const Forum = () => {
  useTheme();

  return (
    <div className="w-full flex flex-col grow min-h-[100vh] font-inter bg-base-300 paddingContainer">
      <div className="py-4">
        <MainNavbar />
      </div>

      <div className="flex flex-col grow items-center justify-center w-full">
        <h1 className="text-4xl font-bold">Good things take time</h1>
        <p className="text-accent">This feature will be available soon. Stay tuned.</p>
      </div>
    </div>
  );
};
