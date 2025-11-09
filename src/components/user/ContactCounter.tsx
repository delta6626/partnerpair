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
        Saved Contacts
      </div>

      <div className="mt-2 text-center">
        <h1 className="text-3xl font-bold">{user?.basicInfo.contactList.length}</h1>
        <p className="mt-2 text-accent">View contact details</p>
      </div>
    </div>
  );
};
