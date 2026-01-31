import { Trash2 } from "lucide-react";
import { MESSAGES } from "../../../shared/constants/MESSAGES";
import type { ChatMetaData } from "../../../shared/types/ChatMetaData";
import type { MouseEvent } from "react";
import { useSelectedChatStore } from "../../store/useSelectedChatStore";
import { useMutation } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebaseConfig";
import { Loader } from "../Loader";
import { MODALS } from "../../../shared/constants/MODALS";

export const ChatCard = ({ chat, currentUserId }: { chat: ChatMetaData; currentUserId: string }) => {
  const { selectedChatId, setSelectedChatId } = useSelectedChatStore();
  const otherParticipantId = chat.participants.find((id) => id !== currentUserId)!;

  const deleteChat = httpsCallable(functions, "deleteChat");

  const { mutate: initiateChatDelete, isPending: chatDeletePending } = useMutation({
    mutationFn: async () => {
      await deleteChat({ chatId: chat.id });
    },

    onSuccess: () => {
      if (chat.id !== selectedChatId) return;
      setSelectedChatId(null);
    },

    onError: (error) => {
      console.error(error.message);
      const modal = document.getElementById(MODALS.CHAT_DELETE_ERROR_MODAL.ID) as HTMLDialogElement;
      modal.showModal();
    },
  });

  const handleChatClick = () => {
    setSelectedChatId(chat.id);
  };

  const handleChatDeletion = (e: MouseEvent) => {
    e.stopPropagation();
    initiateChatDelete();
  };

  return (
    <button
      className={`btn h-fit p-2 xl:p-4 border border-base-100 rounded-3xl xl:w-full flex justify-between gap-4 ${
        selectedChatId === chat.id ? "bg-base-100" : ""
      }`}
      onClick={handleChatClick}
    >
      <div className="flex items-center gap-4">
        <img
          className="rounded-full w-10 h-10 xl:h-15 xl:w-15"
          src={chat.participantProfileImageUrls[otherParticipantId]}
          alt="Profile"
        />

        <div className="flex flex-col justify-center items-start">
          <h1 className="text-base font-medium max-w-30 md:max-w-45 xl:max-w-60 truncate">
            {chat.participantNames[otherParticipantId]}
          </h1>
          <p className="text-accent font-normal max-w-30 md:max-w-45 xl:max-w-60 truncate">
            {chat.lastMessage
              ? `${chat.lastMessageSenderId !== otherParticipantId ? "You:" : ""} ${chat.lastMessage}`
              : MESSAGES.NO_MESSAGES}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2s">
        {chat.unreadCount[currentUserId] > 0 && (
          <div className="badge badge-error">{chat.unreadCount[currentUserId]}</div>
        )}

        <div className="tooltip font-normal" data-tip="Delete Chat">
          <button className="btn btn-square" onClick={handleChatDeletion}>
            {chatDeletePending ? <Loader /> : <Trash2 className="text-error/60" size={20} />}
          </button>
        </div>
      </div>
    </button>
  );
};
