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
import { ContactHolder } from "../components/user/ContactHolder";
import { Search } from "lucide-react";
import { useState } from "react";

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
      const response = await getUserContacts({ contactList: user?.basicInfo.contactList });
      return response.data as Contact[];
    },
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredContacts = contactsData?.filter((contact) =>
    (contact.contactFirstName + " " + contact.contactLastName).toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="flex flex-col items-center grow">
        <div className="py-10 w-full flex items-center justify-between max-w-200">
          <div className="">
            <h1 className="font-bold text-3xl">Contacts</h1>
            <p className="text-accent">{USER_CONTACTS.SUBTITLE_TEXT}</p>
          </div>
          <div className="relative">
            <Search size={20} className="text-accent absolute left-4 top-1/2 -translate-y-1/2 z-10" />
            <input
              className="input pl-12 min-w-100"
              placeholder={USER_CONTACTS.SEARCH_PLACEHOLDER}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
          </div>
        </div>

        {contactsLoading ? (
          <div className="w-full h-full max-w-200 flex grow items-center justify-center">
            <Loader />
          </div>
        ) : contactsLoadingError ? (
          <div className="w-full h-full max-w-200 flex grow items-center justify-center">
            <p className="text-accent">{USER_CONTACTS.LOADING_FAILED}</p>
          </div>
        ) : user?.basicInfo.contactList.length === 0 || !contactsData ? (
          <div className="w-full h-full max-w-200 flex grow items-center justify-center">
            <p className="text-accent">{USER_CONTACTS.NO_CONTACTS}</p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 max-w-200">
            {filteredContacts?.map((contact) => {
              return <ContactHolder key={contact.contactId} contactDetails={contact} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
