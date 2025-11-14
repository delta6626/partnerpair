import type { Contact } from "../../../shared/types/Contact";
import { AddContact } from "./AddContact";

export const ContactHolder = ({ contactDetails }: { contactDetails: Contact }) => {
  return (
    <div className="flex items-center justify-between p-4 border border-accent rounded-3xl">
      <div className="flex items-center gap-4">
        <img
          className="w-15 h-15 rounded-full"
          src={contactDetails.contactProfileImageURL}
          alt={`${contactDetails.contactFirstName} ${contactDetails.contactLastName}`}
        />
        <h1 className="flex gap-2">{contactDetails.contactFirstName + " " + contactDetails.contactLastName}</h1>
      </div>

      <div className="flex gap-2">
        <AddContact contactId={contactDetails.contactId} />
        <button className="btn btn-primary">Message</button>
      </div>
    </div>
  );
};
