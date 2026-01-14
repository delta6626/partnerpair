import type { Contact } from "../../../shared/types/Contact";
import { MessageUser } from "../messaging/MessageUser";
import { AddContact } from "./AddContact";
import { useNavigate } from "react-router-dom";

export const ContactHolder = ({ contactDetails }: { contactDetails: Contact }) => {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate(`/user/${contactDetails.contactId}`);
  };

  return (
    <div className="flex items-center justify-between p-4 border border-base-100 rounded-3xl">
      <div className="cursor-pointer flex items-center gap-4" onClick={handleProfileClick}>
        <img
          className="w-15 h-15 rounded-full"
          src={contactDetails.contactProfileImageURL}
          alt={`${contactDetails.contactFirstName} ${contactDetails.contactLastName}`}
        />

        <div className="">
          <h1 className="">{contactDetails.contactFirstName + " " + contactDetails.contactLastName}</h1>
          <p className="text-accent">{contactDetails.contactHeadline ?? "No headline"}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <AddContact contactId={contactDetails.contactId} />
        <MessageUser otherParticipantId={contactDetails.contactId} />
      </div>
    </div>
  );
};
