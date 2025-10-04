import { useEffect, useState } from "react";
import { useInitializeUser } from "../../hooks/useInitializeUser";
import { AlertCircle, X } from "lucide-react";
import { profileComplete } from "../../utils/profileComplete";

export const ProfileStatusMessage = () => {
  const { user } = useInitializeUser();
  const [visible, setVisible] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  const handleDismiss = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (!user) return;
    const profileStatus = profileComplete(user);
    if (typeof profileStatus === "boolean" && profileStatus === true) return;
    const messageText = profileStatus[1] as string;
    setMessage(messageText);
  }, [user]);

  return (
    <div className="">
      {!user?.basicInfo.profileCompleted && visible ? (
        <div className="bg-warning text-warning-content flex items-center justify-between rounded-2xl p-4">
          <div className="flex gap-2">
            <AlertCircle size={20} />
            <p>Complete your profile</p>
          </div>
          <button className="cursor-pointer" onClick={handleDismiss}>
            <X size={20} />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
