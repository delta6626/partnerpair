import type { LucideIcon } from "lucide-react";
import { SETTINGS } from "../../../shared/constants/SETTINGS";

export const DemoUser = ({
  userName,
  userHeadline,
  SideIcon,
}: {
  userName: string;
  userHeadline: string;
  SideIcon: LucideIcon;
}) => {
  return (
    <div className="min-w-lg flex items-center justify-between rounded-3xl border border-base-100 bg-base-200 p-4">
      <div className="flex items-center gap-4">
        <img className="w-10 h-10 rounded-full" src={`${SETTINGS.DICEBEAR_API_URL}${userName}`} />

        <div>
          <p className="font-medium">{userName}</p>
          <p className="text-accent">{userHeadline}</p>
        </div>
      </div>

      <SideIcon size={20} />
    </div>
  );
};
