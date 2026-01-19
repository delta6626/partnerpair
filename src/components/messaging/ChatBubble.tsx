import { useState } from "react";
import type { ChatMessage } from "../../../shared/types/ChatMessage";
import { formatDate } from "../../../shared/utils/formatDate";

export const ChatBubble = ({
  message,
  currentUserId,
  otherParticipantId,
}: {
  message: ChatMessage;
  currentUserId: string;
  otherParticipantId: string;
}) => {
  const [hiddenItemsVisible, setHiddenItemsVisible] = useState<boolean>(false);

  const isSentByCurrentUser = message.senderId === currentUserId;
  return (
    <>
      <div
        className={
          isSentByCurrentUser
            ? "text-white max-w-[70%] bg-primary px-4 py-2 rounded-t-3xl rounded-bl-3xl rounded-br-md self-end cursor-pointer break-all"
            : "max-w-[70%] bg-base-300 px-4 py-2 rounded-t-3xl rounded-bl-md rounded-br-3xl self-start cursor-pointer break-all"
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
    </>
  );
};
