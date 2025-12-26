import type { ChatMetaData } from "../../../shared/types/ChatMetaData";

export const ChatCard = ({ chat, currentUserId }: { chat: ChatMetaData; currentUserId: string }) => {
  const otherParticipantId = chat.participants.find((id) => id !== currentUserId);

  return (
    <div className="p-2 border-1 border-accent rounded-3xl w-full">
      <img
        className="rounded-3xl"
        src={chat.participantProfileImageUrls[otherParticipantId!]}
        alt="Profile"
        width={50}
      />
    </div>
  );
};
