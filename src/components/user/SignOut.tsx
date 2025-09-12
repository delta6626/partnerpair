import { useState } from "react";
import Loader from "../Loader";
import { LogOut } from "lucide-react";

export const SignOut = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignOut = () => {
    return;
  };

  return (
    <button className="btn" onClick={handleSignOut}>
      {loading ? <Loader /> : <LogOut size={20} />}
      Sign out
    </button>
  );
};
