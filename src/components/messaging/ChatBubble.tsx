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
          ? "text-white max-w-[70%] bg-primary px-4 py-2 rounded-t-3xl rounded-bl-3xl rounded-br-md self-end cursor-default"
          : "max-w-[70%] bg-base-300 px-4 py-2 rounded-t-3xl rounded-bl-md rounded-br-3xl self-start cursor-default"
      }
    >
      {message.content}
    </div>
  );
};
