import { useState } from "react";
import Loader from "../Loader";
import { LogOut } from "lucide-react";
import { signOut } from "../../sevices/authentication/authServices";
import { SIGNUP } from "../../constants/SIGNUP";
import { useNavigate } from "react-router-dom";

export const SignOut = ({ applyMinimumWidth }: { applyMinimumWidth: boolean }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

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
    <button className={applyMinimumWidth ? "btn min-w-40" : "btn"} onClick={handleSignOut}>
      {loading ? <Loader /> : <LogOut size={20} />}
      Sign out
    </button>
  );
};
