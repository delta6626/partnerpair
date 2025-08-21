import { useUserStore } from "../store/useUserStore";

export const Dashboard = () => {
  const { user } = useUserStore();

  return (
    <div className="font-inter text-3xl font-bold">
      {"Hello, " + user?.basicInfo.firstName}
    </div>
  );
};
