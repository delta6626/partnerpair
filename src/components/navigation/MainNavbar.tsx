import { Logo } from "../branding/Logo";
import { NotificationOverview } from "../notifications/NotificationOverview";
import { MainNavbarNavigationItems } from "./MainNavbarNavigationItems";
import { ProfileDropdown } from "../user/ProfileDropdown";

export const MainNavbar = () => {
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
        <ProfileDropdown />
      </div>
    </div>
  );
};
