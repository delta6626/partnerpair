import { useState, type FormEvent } from "react";
import { MESSAGES } from "../../../shared/constants/MESSAGES";
import { useSelectedChatStore } from "../../store/useSelectedChatStore";
import { addChatMessage } from "../../services/messaging/messagingServices";
import { Loader } from "../Loader";
import TextareaAutoSize from "react-textarea-autosize";
import { SendHorizonal } from "lucide-react";

export const MessageInput = ({
  currentUserId,
  otherParticipantId,
}: {
  currentUserId: string;
  otherParticipantId: string;
}) => {
  const { selectedChatId } = useSelectedChatStore();
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendingMessage(true);
    setMessage("");

    const messageContent = message.trim();
    if (!messageContent || !selectedChatId) return;

    const messageSent = await addChatMessage(selectedChatId, currentUserId, otherParticipantId, messageContent);

    if (typeof messageSent === "string" || (typeof messageSent === "boolean" && !messageSent)) {
      // TODO: handle error case later.
      setMessage(messageContent); // reset message input to previous content
      setSendingMessage(false);
      return;
    }

    // Message successfully sent
    setSendingMessage(false);
  };

  return (
    <form className="py-4 w-full px-16" onSubmit={handleSendMessage}>
      <div className="flex items-center p-2 gap-2 w-full border border-base-100 rounded-[50px]">
        <TextareaAutoSize
          minRows={1}
          maxRows={5}
          className="textarea w-full p-4 rounded-3xl resize-none border-none focus:outline-none min-h-[2rem]"
          placeholder={MESSAGES.WRITE_MESSAGE}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-primary btn-square rounded-full"
          disabled={sendingMessage || !message.trim()}
        >
          {sendingMessage ? <Loader /> : <SendHorizonal size={20} />}
        </button>
      </div>
    </form>
  );
};
