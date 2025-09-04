import { Link } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { LogOut, Settings } from "lucide-react";

export const ProfileDropdown = () => {
  const { user } = useUserStore();

  const handleSignOut = () => {};

  return (
    <div className="dropdown dropdown-bottom dropdown-center">
      <img tabIndex={0} role="button" src={user?.basicInfo.profileImageUrl} className="btn btn-square rounded-full" />
      <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-fit mt-2 shadow-sm">
        <Link to={"/settings"} className="btn">
          <Settings size={20} />
          Settings
        </Link>
        <hr className="text-accent"></hr>
        <button className="btn" onClick={handleSignOut}>
          <LogOut size={20} />
          Sign out
        </button>
      </ul>
    </div>
  );
};
