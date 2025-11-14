import { useQuery } from "@tanstack/react-query";
import { USER_CONTACTS } from "../../shared/constants/USER_CONTACTS";
import { Loader } from "../components/Loader";
import { MainNavbar } from "../components/navigation/MainNavbar";
import { useInitializeUser } from "../hooks/useInitializeUser";
import { QUERY_KEYS } from "../../shared/constants/QUERY_KEYS";
import { httpsCallable } from "firebase/functions";
import { functions } from "../services/firebaseConfig";
import type { Contact } from "../../shared/types/Contact";
import { useTheme } from "../hooks/useTheme";

export const UserContacts = () => {
  useTheme();
  const getUserContacts = httpsCallable(functions, "getUserContacts");

  const { user, loading } = useInitializeUser();
  const {
    data: contactsData,
    isLoading: contactsLoading,
    isError: contactsLoadingError,
  } = useQuery({
    queryKey: [QUERY_KEYS.CONTACT_COLLECTION],
    queryFn: async () => {
      const response = await getUserContacts();
      return response.data as Contact[];
    },
  });

  if (loading) {
    return (
      <div className="w-full min-h-[100vh] bg-base-300 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-[100vh] font-inter bg-base-300 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-28">
      <div className="py-4">
        <MainNavbar />
      </div>

      <div className="py-10 flex flex-col items-center grow">
        <div className="w-full max-w-200">
          <h1 className="font-bold text-3xl">Contacts</h1>
          <p className="text-accent">{USER_CONTACTS.SUBTITLE_TEXT}</p>
        </div>

        {contactsLoading ? (
          <div className="w-full h-full max-w-200 flex grow items-center justify-center">
            <Loader />
          </div>
        ) : contactsLoadingError ? (
          <div className="w-full h-full max-w-200 flex grow items-center justify-center">
            <p className="text-accent">Failed to load contacts.</p>
          </div>
        ) : user?.basicInfo.contactList.length === 0 ? (
          <div className="w-full h-full max-w-200 flex grow items-center justify-center">
            <p className="text-accent">{USER_CONTACTS.NO_CONTACTS}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
