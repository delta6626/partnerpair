import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { LogOut, Settings } from "lucide-react";
import { signOut } from "../../sevices/authentication/authServices";
import { SIGNUP } from "../../constants/SIGNUP";
import { useState } from "react";
import Loader from "../Loader";

export const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    const status = await signOut();
    setLoading(false);

    if (status === SIGNUP.SIGNOUT_SUCCESS) {
      navigate("/login");
    } else {
      return; // Handle error case.
    }
  };

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
          {loading ? <Loader /> : <LogOut size={20} />}
          Sign out
        </button>
      </ul>
    </div>
  );
};
