import { Logo } from "../branding/Logo";
import { NotificationOverview } from "../notifications/NotificationOverview";
import { MainNavbarNavigationItems } from "./MainNavbarNavigationItems";
import { ProfileDropdown } from "../user/ProfileDropdown";
import { useInitializeUser } from "../../hooks/useInitializeUser";
import { AlertCircle } from "lucide-react";

export const MainNavbar = () => {
  const { user } = useInitializeUser();

  return (
    <div className="flex items-center justify-between">
      <div className="">
        <Logo />
      </div>

      <div className="">
        <MainNavbarNavigationItems />
      </div>

      <div className="flex gap-2">
        <NotificationOverview />
        <div className="flex flex-row items-end">
          <ProfileDropdown />
          {user?.basicInfo.profileCompleted ? (
            ""
          ) : (
            <AlertCircle size={20} className="bg-error rounded-full text-white" />
          )}
        </div>
      </div>
    </div>
  );
};
