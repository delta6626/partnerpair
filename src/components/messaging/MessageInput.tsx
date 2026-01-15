import { useRef, useState, type FormEvent, type MouseEvent } from "react";
import { MESSAGES } from "../../../shared/constants/MESSAGES";
import { useSelectedChatStore } from "../../store/useSelectedChatStore";
import { addChatMessage } from "../../services/messaging/messagingServices";
import { Loader } from "../Loader";
import TextareaAutoSize from "react-textarea-autosize";
import { Lightbulb, SendHorizonal } from "lucide-react";
import { MODALS } from "../../../shared/constants/MODALS";

export const MessageInput = ({
  currentUserId,
  otherParticipantId,
}: {
  currentUserId: string;
  otherParticipantId: string;
}) => {
  const { selectedChatId } = useSelectedChatStore();
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  const handleRandomMessageButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const randomIndex = Math.floor(Math.random() * MESSAGES.ICEBREAKER_MESSAGES.length);
    const randomMessage = MESSAGES.ICEBREAKER_MESSAGES[randomIndex];
    setMessage(randomMessage);
    e.currentTarget.blur();
    textAreaRef.current?.focus();
  };

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendingMessage(true);
    setMessage("");

    const messageContent = message.trim();
    if (!messageContent || !selectedChatId || messageContent.length > 2000) {
      setSendingMessage(false);
      return;
    }

    const messageSent = await addChatMessage(selectedChatId, currentUserId, otherParticipantId, messageContent);

    if (typeof messageSent === "string" || (typeof messageSent === "boolean" && !messageSent)) {
      const errorModal = document.getElementById(MODALS.FAILED_MESSAGE_ERROR_MODAL.ID) as HTMLDialogElement;
      errorModal.showModal();

      setMessage(messageContent); // reset message input to previous content
      setSendingMessage(false);
      return;
    }

    // Message successfully sent
    setSendingMessage(false);
  };

  return (
    <form className="py-4 w-full px-16" ref={formRef} onSubmit={handleSendMessage}>
      <div className="flex items-center p-2 gap-2 w-full border border-base-100 rounded-[50px]">
        <TextareaAutoSize
          ref={textAreaRef}
          minRows={1}
          maxRows={5}
          className="textarea w-full p-4 rounded-3xl resize-none border-none focus:outline-none min-h-[2rem]"
          placeholder={MESSAGES.WRITE_MESSAGE}
          value={message}
          maxLength={MESSAGES.MESSAGE_MAX_LENGTH}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
              e.preventDefault();
              formRef.current?.requestSubmit();
            }
          }}
        />

        <button className="btn btn-soft btn-square rounded-full" onClick={handleRandomMessageButtonClick}>
          <Lightbulb size={20} />
        </button>

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
