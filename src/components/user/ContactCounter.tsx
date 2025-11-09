import { ContactRound } from "lucide-react";
import { useInitializeUser } from "../../hooks/useInitializeUser";
import { Loader } from "../Loader";
import { DASHBOARD } from "../../../shared/constants/DASHBOARD";

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

      <div className="mt-4 text-center">
        <h1 className="text-3xl font-bold">{user?.basicInfo.contactList.length}</h1>
        <p className="mt-2 text-accent">
          {user?.basicInfo.contactList.length === 0
            ? DASHBOARD.CONTACT_COUNTER_NO_CONTACTS
            : DASHBOARD.CONTACT_COUNTER_VIEW_SAVED}
        </p>
      </div>
    </div>
  );
};
