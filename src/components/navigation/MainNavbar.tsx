import { Settings } from "lucide-react";
import { Logo } from "../branding/Logo";
import { NotificationOverview } from "../notifications/NotificationOverview";
import { MainNavbarNavigationItems } from "./MainNavbarNavigationItems";
import { Link } from "react-router-dom";

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
        <Link to={"/settings"} className="btn btn-square">
          <Settings size={20} />
        </Link>
      </div>
    </div>
  );
};
