import { useState } from "react";
import { useInitializeUser } from "../../hooks/useInitializeUser";
import { X } from "lucide-react";

export const ProfileStatusMessage = () => {
  const { user } = useInitializeUser();
  const [visible, setVisible] = useState<boolean>(true);

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <div className="">
      {!user?.basicInfo.profileCompleted && visible ? (
        <div className="flex items-center justify-between bg-error rounded-2xl p-4 text-error-content">
          <p>Complete your profile</p>
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
