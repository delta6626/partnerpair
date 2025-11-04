import { useState } from "react";
import { Loader } from "../Loader";
import { LogOut } from "lucide-react";
import { signOut } from "../../services/authentication/authServices";
import { SIGNUP } from "../../../shared/constants/SIGNUP";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { useQueryClient } from "@tanstack/react-query";

export const SignOut = ({ applyMinimumWidth }: { applyMinimumWidth: boolean }) => {
  const navigate = useNavigate();
  const { resetUser } = useUserStore();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignOut = async () => {
    setLoading(true);
    const status = await signOut();
    resetUser();
    queryClient.clear();
    setLoading(false);

    if (status === SIGNUP.SIGNOUT_SUCCESS) {
      navigate("/login");
    } else {
      return; // Handle error case.
    }
  };

  return (
    <button className={applyMinimumWidth ? "btn min-w-45" : "btn"} onClick={handleSignOut}>
      {loading ? <Loader /> : <LogOut size={20} />}
      Sign out
    </button>
  );
};
