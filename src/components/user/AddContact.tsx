import { useInitializeUser } from "../../hooks/useInitializeUser";

export const AddContact = ({ contactId }: { contactId: string }) => {
  const { user } = useInitializeUser();
  const userIsAContact = user?.basicInfo.contactList.includes(contactId);

  return (
    <button className={`btn ${userIsAContact ? "btn-error" : ""}`}>
      {userIsAContact ? "Remove Contact" : "Add to Contacts"}
    </button>
  );
};
