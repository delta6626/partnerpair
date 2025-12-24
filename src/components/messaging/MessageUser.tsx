import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebaseConfig";

export const MessageUser = ({ otherParticipantId }: { otherParticipantId: string }) => {
  const initiateChat = httpsCallable(functions, "initiateChat");

  return <button className="btn btn-primary">Message</button>;
};
