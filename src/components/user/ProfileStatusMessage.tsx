import { useState } from "react";
import { useInitializeUser } from "../../hooks/useInitializeUser";

export const ProfileStatusMessage = () => {
  const { user } = useInitializeUser();
  const [visible, setVisible] = useState(true);

  return (
    <div className="">
      {!user?.basicInfo.profileCompleted && visible ? (
        <div className="bg-error rounded-md p-4 text-error-content">
          <p>Complete your profile</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
