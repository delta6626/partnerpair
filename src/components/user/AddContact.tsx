import { useState } from "react";
import type { User } from "../../../shared/types/User";
import { useInitializeUser } from "../../hooks/useInitializeUser";
import { updateUserProfile } from "../../services/userProfile/userProfileServices";
import { useUserStore } from "../../store/useUserStore";
import { Loader } from "../Loader";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import { getUserId } from "../../services/authentication/authServices";
import type { AddContactButtonVariant } from "../../../shared/types/AddContactButtonVariant";
import { UserRoundPlus, UserRoundMinus } from "lucide-react";
import { MODALS } from "../../../shared/constants/MODALS";

export const AddContact = ({
  buttonType,
  contactId,
  className,
}: {
  buttonType?: AddContactButtonVariant;
  contactId: string;
  className?: string;
}) => {
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
    if (userIdLoading) return;
    if (userIdError) return;

    if (userId === contactId) return; // User cannot add themselves as a contact

    setLoading(true);
    const updatedUser: User = {
      ...user,
      basicInfo: { ...user.basicInfo, contactList: [...user.basicInfo.contactList, contactId] },
    };

    const result = await updateUserProfile(updatedUser, false);
    setLoading(false);

    if (typeof result === "string") {
      const modal = document.getElementById(MODALS.CONTACT_ADDITION_FAILED_ERROR_MODAL.ID) as HTMLDialogElement;
      modal.showModal();
      return;
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

    const result = await updateUserProfile(updatedUser, false);
    setLoading(false);

    if (typeof result === "string") {
      const modal = document.getElementById(MODALS.CONTACT_DELETION_FAILED_ERROR_MODAL.ID) as HTMLDialogElement;
      modal.showModal();
      return;
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

  if (!buttonType || buttonType === "default") {
    return (
      <button
        className={`btn ${userIsAContact ? "btn bg-error/60" : ""} ${className || ""}`}
        onClick={handleContactChange}
        disabled={userIdLoading || loading || userId === contactId}
      >
        {loading ? <Loader /> : <>{userIsAContact ? "Remove Contact" : "Add to Contacts"}</>}
      </button>
    );
  } else {
    return (
      <button
        className={`btn btn-square ${className || ""}`}
        onClick={handleContactChange}
        disabled={userIdLoading || loading || userId === contactId}
      >
        {loading ? (
          <Loader />
        ) : (
          <>{userIsAContact ? <UserRoundMinus size={20} className="text-error/60" /> : <UserRoundPlus size={20} />}</>
        )}
      </button>
    );
  }
};
