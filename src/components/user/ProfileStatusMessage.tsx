import { useInitializeUser } from "../../hooks/useInitializeUser";

export const ProfileStatusMessage = () => {
  const { user } = useInitializeUser();

  return (
    <div className="bg-error rounded-md p-4 text-error-content">
      <p>Complete your profile</p>
    </div>
  );
};
