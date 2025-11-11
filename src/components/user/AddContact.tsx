import { useState } from "react";
import type { User } from "../../../shared/types/User";
import { useInitializeUser } from "../../hooks/useInitializeUser";
import { updateUserProfile } from "../../services/userProfile/userProfileServices";
import { useUserStore } from "../../store/useUserStore";
import { Loader } from "../Loader";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import { getUserId } from "../../services/authentication/authServices";

export const AddContact = ({ contactId }: { contactId: string }) => {
  const { user } = useInitializeUser();
  const { setUser } = useUserStore();
  const {
    data: userId,
    isLoading: userIdLoading,
    isError: userIdError,
  } = useQuery({ queryKey: [QUERY_KEYS.USER_ID], queryFn: getUserId });

  const [loading, setLoading] = useState<boolean>(false);

  const userIsAContact = user?.basicInfo.contactList.includes(contactId);

  const addContact = async () => {
    if (!user) return;

    setLoading(true);
    const updatedUser: User = {
      ...user,
      basicInfo: { ...user.basicInfo, contactList: [...user.basicInfo.contactList, contactId] },
    };

    const result = await updateUserProfile(updatedUser);
    setLoading(false);

    if (typeof result === "string") {
      return; // TO DO: handle error case;
    }

    setUser(updatedUser);
  };

  const removeContact = async () => {
    if (!user) return;

    setLoading(true);
    const updatedContactList = user.basicInfo.contactList.filter((id) => id !== contactId);

    const updatedUser: User = {
      ...user,
      basicInfo: {
        ...user.basicInfo,
        contactList: updatedContactList,
      },
    };

    const result = await updateUserProfile(updatedUser);
    setLoading(false);

    if (typeof result === "string") {
      return; // TO DO: handle error case;
    }

    setUser(updatedUser);
  };

  const handleContactChange = () => {
    if (userIsAContact) {
      removeContact();
    } else {
      addContact();
    }
  };

  return (
    <button className={`btn ${userIsAContact ? "btn-error" : ""}`} onClick={handleContactChange}>
      {loading ? <Loader /> : <>{userIsAContact ? "Remove Contact" : "Add to Contacts"}</>}
    </button>
  );
};
