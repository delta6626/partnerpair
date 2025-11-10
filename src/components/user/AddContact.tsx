import { useInitializeUser } from "../../hooks/useInitializeUser";

export const AddContact = ({ contactId }: { contactId: string }) => {
  const { user } = useInitializeUser();

  return (
    <button className="btn">
      {user?.basicInfo.contactList.includes(contactId) ? "Remove Contact" : "Add to Contacts"}
    </button>
  );
};
