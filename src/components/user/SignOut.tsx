import { useState } from "react";
import { Loader } from "../Loader";
import { LogOut } from "lucide-react";
import { signOut } from "../../services/authentication/authServices";
import { SIGNUP } from "../../../shared/constants/SIGNUP";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { clearStores } from "../../store/clearStores";

export const SignOut = ({ applyMinimumWidth, className }: { applyMinimumWidth: boolean; className?: string }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignOut = async () => {
    setLoading(true);
    const status = await signOut();

    clearStores();
    queryClient.clear();

    setLoading(false);

    if (status === SIGNUP.SIGNOUT_SUCCESS) {
      navigate("/login");
    } else {
      return; // Handle error case.
    }
  };

  return (
    <button className={`${applyMinimumWidth ? "btn min-w-45" : "btn"} ${className ?? ""}`} onClick={handleSignOut}>
      {loading ? <Loader /> : <LogOut size={20} className="text-accent" />}
      Sign out
    </button>
  );
};
