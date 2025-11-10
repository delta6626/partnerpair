import type { User } from "../../../shared/types/User";
import { useInitializeUser } from "../../hooks/useInitializeUser";
import { updateUserProfile } from "../../services/userProfile/userProfileServices";
import { useUserStore } from "../../store/useUserStore";

export const AddContact = ({ contactId }: { contactId: string }) => {
  const { user } = useInitializeUser();
  const { setUser } = useUserStore();
  const userIsAContact = user?.basicInfo.contactList.includes(contactId);

  const addContact = async () => {
    const updatedUser: User = {
      basicInfo: { ...user!.basicInfo, contactList: [...user!.basicInfo.contactList, contactId] },
      professionalInfo: { ...user!.professionalInfo },
      matchingPreferences: { ...user!.matchingPreferences },
      socialLinks: { ...user!.socialLinks },
    };

    const userUpdated = await updateUserProfile(updatedUser);
    if (typeof userUpdated === "string") {
      return; // TO DO: handle error case;
    }

    setUser(user!);
  };

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
