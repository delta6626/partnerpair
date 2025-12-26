import type { ChatMetaData } from "../../../shared/types/ChatMetaData";

export const ChatCard = ({ chat, currentUserId }: { chat: ChatMetaData; currentUserId: string }) => {
  const otherParticipantId = chat.participants.find((id) => id !== currentUserId)!;

  return (
    <div className="p-2 border-1 border-accent rounded-3xl w-full flex gap-4">
      <img
        className="rounded-3xl"
        src={chat.participantProfileImageUrls[otherParticipantId]}
        alt="Profile"
        width={50}
      />

      <div className="flex flex-col justify-center items-start">
        <h1 className="">{chat.participantNames[otherParticipantId]}</h1>
        <p className="text-accent">{chat.lastMessage ? chat.lastMessage : "No messages yet. Say hi!"}</p>
      </div>
    </div>
  );
};
