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
  return <div className="">Chat Bubble</div>;
};
