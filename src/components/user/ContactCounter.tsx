import { ContactRound } from "lucide-react";
import { useInitializeUser } from "../../hooks/useInitializeUser";
import { Loader } from "../Loader";

export const ContactCounter = () => {
  const { user, loading } = useInitializeUser();

  if (loading)
    return (
      <div className="rounded-3xl bg-base-200 min-w-75 w-fit flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="p-4 rounded-3xl bg-base-200 min-w-75 w-fit flex flex-col gap-2">
      <div className="flex gap-2">
        <ContactRound size={20} />
        Contacts
      </div>
    </div>
  );
};
