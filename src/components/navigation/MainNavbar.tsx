import { Settings } from "lucide-react";
import { Logo } from "../branding/Logo";
import { NotificationOverview } from "../notifications/NotificationOverview";
import { MainNavbarNavigationItems } from "./MainNavbarNavigationItems";
import { Link } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

export const MainNavbar = () => {
  const { user } = useUserStore();

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
        <div className="">
          <div className="dropdown dropdown-bottom dropdown-center">
            <img
              tabIndex={0}
              role="button"
              src={user?.basicInfo.profileImageUrl}
              className="btn btn-square rounded-full"
            />
            <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2 shadow-sm">
              <Link to={"/settings"} className="btn">
                Settings
              </Link>
              <hr className="text-accent"></hr>
              <button className="btn">Sign out</button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
