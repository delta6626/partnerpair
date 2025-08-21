import { useInitializeUser } from "../hooks/useInitializeUser";

export const Dashboard = () => {
  const { user } = useInitializeUser();

  return (
    <div className="font-inter text-3xl font-bold">
      {"Hello, " + user?.basicInfo.firstName}
    </div>
  );
};
