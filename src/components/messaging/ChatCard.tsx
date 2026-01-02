import { Trash2 } from "lucide-react";
import { MESSAGES } from "../../../shared/constants/MESSAGES";
import type { ChatMetaData } from "../../../shared/types/ChatMetaData";
import type { MouseEvent } from "react";
import { useSelectedChatStore } from "../../store/useSelectedChatStore";
import { useMutation } from "@tanstack/react-query";

export const ChatCard = ({ chat, currentUserId }: { chat: ChatMetaData; currentUserId: string }) => {
  const { setSelectedChatId } = useSelectedChatStore();
  const otherParticipantId = chat.participants.find((id) => id !== currentUserId)!;

  const { mutate: initiateChatDelete, isError, isPending } = useMutation({});

  const handleChatClick = () => {
    setSelectedChatId(chat.id);
  };

  const handleChatDeletion = (e: MouseEvent) => {
    e.stopPropagation();
    // Implement chat deletion logic here
  };

  return (
    <button
      className="btn h-fit p-4 border-1 border-accent rounded-3xl w-full flex justify-between"
      onClick={handleChatClick}
    >
      <div className="flex gap-4">
        <img
          className="rounded-3xl"
          src={chat.participantProfileImageUrls[otherParticipantId]}
          alt="Profile"
          width={50}
        />

        <div className="flex flex-col justify-center items-start">
          <h1 className="text-base font-medium max-w-60 truncate">{chat.participantNames[otherParticipantId]}</h1>
          <p className="text-accent font-normal max-w-60 truncate">
            {chat.lastMessage ? chat.lastMessage : MESSAGES.NO_MESSAGES}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {chat.unreadCount[currentUserId] > 0 && (
          <div className="badge badge-error">{chat.unreadCount[currentUserId]}</div>
        )}

        <div className="tooltip font-normal" data-tip="Delete Chat">
          <button className="btn btn-square" onClick={handleChatDeletion}>
            <Trash2 className="text-error/60" size={20} />
          </button>
        </div>
      </div>
    </button>
  );
};
