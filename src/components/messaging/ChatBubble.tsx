import { useState } from "react";
import type { ChatMessage } from "../../../shared/types/ChatMessage";
import { formatDate } from "../../../shared/utils/formatDate";
import { useSelectedMessageStore } from "../../store/useSelectedMessageStore";

export const ChatBubble = ({
  message,
  currentUserId,
  otherParticipantId,
}: {
  message: ChatMessage;
  currentUserId: string;
  otherParticipantId: string;
}) => {
  const { setSelectedMessage } = useSelectedMessageStore();

  const [hiddenItemsVisible, setHiddenItemsVisible] = useState<boolean>(false);

  const isSentByCurrentUser = message.senderId === currentUserId;

  const handleReportAbuseClick = () => {
    setSelectedMessage({ ...message, reporterId: currentUserId });
  };

  return (
    <>
      <div
        className={
          isSentByCurrentUser
            ? "text-white max-w-[70%] bg-primary px-4 py-2 rounded-t-3xl rounded-bl-3xl rounded-br-md self-end cursor-pointer break-all select-none"
            : "max-w-[70%] bg-base-300 px-4 py-2 rounded-t-3xl rounded-bl-md rounded-br-3xl self-start cursor-pointer break-all select-none"
        }
        onClick={() => {
          setHiddenItemsVisible(!hiddenItemsVisible);
        }}
      >
        {message.content}
      </div>

      {hiddenItemsVisible && (
        <p className={isSentByCurrentUser ? "self-end text-accent mt-[-8px]" : "self-start text-accent mt-[-4px]"}>
          {formatDate(message.sentAt, {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      )}

      {!isSentByCurrentUser && hiddenItemsVisible && (
        <button
          className="btn btn-sm bg-base-300 mt-1 h-0 p-0 self-start text-error/60 hover:text-error border-none"
          onClick={handleReportAbuseClick}
        >
          Report abuse
        </button>
      )}
    </>
  );
};
