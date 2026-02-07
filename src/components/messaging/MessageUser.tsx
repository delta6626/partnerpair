import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import type { ChatExistenceInformation } from "../../../shared/types/ChatExistenceInformation";
import { Loader } from "../Loader";
import { useSelectedChatStore } from "../../store/useSelectedChatStore";
import { useNavigate } from "react-router-dom";
import { SETTINGS } from "../../../shared/constants/SETTINGS";
import { MODALS } from "../../../shared/constants/MODALS";

export const MessageUser = ({ otherParticipantId, className }: { otherParticipantId: string; className?: string }) => {
  const navigate = useNavigate();

  const initiateChat = httpsCallable(functions, "initiateChat");
  const { setSelectedChatId } = useSelectedChatStore();

  const { mutate: initiateChatMutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await initiateChat({ otherParticipantId: otherParticipantId });
      return response.data as ChatExistenceInformation["chatId"];
    },
    onSuccess: (chatId) => {
      setSelectedChatId(chatId);
      navigate("/messages");
    },
    onError: (error) => {
      if (error.message === SETTINGS.PRO_TIER_REQUIRED) {
        const modal = document.getElementById(MODALS.MAX_CHATS_REACHED_ERROR_MODAL.ID) as HTMLDialogElement;
        modal.showModal();
      } else {
        const modal = document.getElementById(MODALS.CHAT_CREATION_FAILED_ERROR_MODAL.ID) as HTMLDialogElement;
        modal.showModal();
      }
    },
  });

  const handleMessageButtonClick = () => {
    if (isPending) return;
    if (!otherParticipantId) return;
    initiateChatMutate();
  };

  return (
    <button className={`btn btn-primary ${className || ""}`} onClick={handleMessageButtonClick} disabled={isPending}>
      {isPending ? <Loader /> : "Message"}
    </button>
  );
};
