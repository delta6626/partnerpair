import { Settings } from "lucide-react";
import { Logo } from "../branding/Logo";
import { NotificationOverview } from "../notifications/NotificationOverview";
import { MainNavbarNavigationItems } from "./MainNavbarNavigationItems";

export const MainNavbar = () => {
  return (
    <div className="flex itesm-center justify-between">
      <div className="">
        <Logo />
      </div>
      <div className="">
        <MainNavbarNavigationItems />
      </div>
      <div className="flex gap-2">
        <NotificationOverview />
        <button className="btn btn-square">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
};
