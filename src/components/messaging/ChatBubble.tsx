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
          ? "bg-primary px-4 py-2 rounded-t-3xl rounded-bl-3xl rounded-br-none self-end"
          : "bg-base-300"
      }
    >
      {message.content}
    </div>
  );
};
