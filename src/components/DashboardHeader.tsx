import { DASHBOARD } from "../../shared/constants/DASHBOARD";
import type { User } from "../../shared/types/User";
import { UnreadMessageCounter } from "./messaging/UnreadMessageCounter";
import { ContactCounter } from "./user/ContactCounter";
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
        <h1 className="text-xl text-accent">{DASHBOARD.HEADER_SUB_TEXT}</h1>
      </div>

      <div className="mt-4 flex gap-4">
        <ProfileViewCount />
        <ContactCounter />
        <UnreadMessageCounter />
      </div>
    </div>
  );
};
