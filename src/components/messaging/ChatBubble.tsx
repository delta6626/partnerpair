import type { ChatMessage } from "../../../shared/types/ChatMessage";

export const ChatBubble = ({
  message,
  currentUserId,
  otherParticipantId,
}: {
  message: ChatMessage;
  currentUserId: string;
  otherParticipantId: string;
}) => {
  const isSentByCurrentUser = message.senderId === currentUserId;
  return (
    <div
      className={
        isSentByCurrentUser
          ? "max-w-[50%] bg-primary px-4 py-2 rounded-t-3xl rounded-bl-3xl rounded-br-md self-end"
          : "max-w-[50%] bg-base-300 px-4 py-2 rounded-t-3xl rounded-bl-3xl rounded-br-md self-start"
      }
    >
      {message.content}
    </div>
  );
};
