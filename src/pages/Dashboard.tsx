import { useInitializeUser } from "../hooks/useInitializeUser";
import { useTheme } from "../hooks/useTheme";

export const Dashboard = () => {
  useTheme();
  const { user } = useInitializeUser();

  return (
    <div className="font-inter text-3xl font-bold">
      {"Hello, " + user?.basicInfo.firstName}
    </div>
  );
};
