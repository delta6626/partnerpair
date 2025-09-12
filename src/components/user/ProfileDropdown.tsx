import { Link } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { Settings } from "lucide-react";
import { SignOut } from "./SignOut";

export const ProfileDropdown = () => {
  const { user } = useUserStore();

  return (
    <div className="dropdown dropdown-bottom dropdown-center">
      <img tabIndex={0} role="button" src={user?.basicInfo.profileImageUrl} className="btn btn-square rounded-full" />
      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2 shadow-sm">
        <Link to={"/settings"} className="btn">
          <Settings size={20} />
          Settings
        </Link>
        <hr className="text-accent"></hr>
        <SignOut />
      </ul>
    </div>
  );
};
