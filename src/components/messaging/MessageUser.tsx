import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import type { ChatExistenceInformation } from "../../../shared/types/ChatExistenceInformation";
import { Loader } from "../Loader";
import { useSelectedChatStore } from "../../store/useSelectedChatStore";
import { useNavigate } from "react-router-dom";

export const MessageUser = ({ otherParticipantId, className }: { otherParticipantId: string; className?: string }) => {
  const navigate = useNavigate();

  const initiateChat = httpsCallable(functions, "initiateChat");
  const { setSelectedChatId } = useSelectedChatStore();

  const {
    mutate: initiateChatMutate,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async () => {
      const response = await initiateChat({ otherParticipantId: otherParticipantId });
      return response.data as ChatExistenceInformation["chatId"];
    },
    onSuccess: (chatId) => {
      setSelectedChatId(chatId);
      navigate("/messages");
    },
  });

  const handleMessageButtonClick = () => {
    if (isPending) return;
    if (!otherParticipantId) return;
    initiateChatMutate();
  };

  return (
    <button
      className={`btn ${isError ? "btn-error" : "btn-primary"} ${className || ""}`}
      onClick={handleMessageButtonClick}
      disabled={isPending}
    >
      {isPending ? <Loader /> : isError ? <p>Error occurred. Try again.</p> : "Message"}
    </button>
  );
};
