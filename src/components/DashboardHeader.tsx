import type { User } from "../../shared/types/User";
import { ProfileStatusMessage } from "./user/ProfileStatusMessage";
import { ProfileViewCount } from "./user/ProfileViewCount";

export const DashboardHeader = ({ user }: { user: User | null }) => {
  return (
    <div className="py-8">
      <div className="mb-4">
        <ProfileStatusMessage />
      </div>
      <div className="">
        <h1 className="text-3xl font-bold">Hello, {user?.basicInfo.firstName}</h1>
        <h1 className="text-xl text-accent">Here's what's happening with your cofounder search.</h1>
      </div>
      <ProfileViewCount />
    </div>
  );
};
