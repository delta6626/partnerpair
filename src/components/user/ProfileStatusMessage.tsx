import { useInitializeUser } from "../../hooks/useInitializeUser";

export const ProfileStatusMessage = () => {
  const { user } = useInitializeUser();

  return <div className="w-full bg-error"></div>;
};
