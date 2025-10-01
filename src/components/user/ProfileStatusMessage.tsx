import { useState } from "react";
import { useInitializeUser } from "../../hooks/useInitializeUser";
import { X } from "lucide-react";

export const ProfileStatusMessage = () => {
  const { user } = useInitializeUser();
  const [visible, setVisible] = useState(true);

  return (
    <div className="">
      {!user?.basicInfo.profileCompleted && visible ? (
        <div className="flex items-center justify-between bg-error rounded-md p-4 text-error-content">
          <p>Complete your profile</p>
          <X size={20} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
