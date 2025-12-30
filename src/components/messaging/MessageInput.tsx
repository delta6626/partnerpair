import { useState, type FormEvent } from "react";
import { MESSAGES } from "../../../shared/constants/MESSAGES";
import { useSelectedChatStore } from "../../store/useSelectedChatStore";

export const MessageInput = ({ currentUserId }: { currentUserId: string }) => {
  const { selectedChatId } = useSelectedChatStore();
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const messageContent = message.trim();
    if (!messageContent || !selectedChatId) return;

    setMessage("");
  };

  return (
    <form className="mb-4 flex gap-2" onSubmit={handleSendMessage}>
      <input
        type="text"
        className="input w-120"
        placeholder={MESSAGES.WRITE_MESSAGE}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Send
      </button>
    </form>
  );
};
