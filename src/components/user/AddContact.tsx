import { useInitializeUser } from "../../hooks/useInitializeUser";

export const AddContact = ({ contactId }: { contactId: string }) => {
  const { user } = useInitializeUser();
  const userIsAContact = user?.basicInfo.contactList.includes(contactId);

  const addContact = () => {};

  const removeContact = () => {};

  const handleContactChange = () => {
    if (userIsAContact) {
      removeContact();
    } else {
      addContact();
    }
  };

  return (
    <button className={`btn ${userIsAContact ? "btn-error" : ""}`} onClick={handleContactChange}>
      {userIsAContact ? "Remove Contact" : "Add to Contacts"}
    </button>
  );
};
