import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import type { ChatExistenceInformation } from "../../../shared/types/ChatExistenceInformtion";
import { Loader } from "../Loader";
import { useSelectedChatStore } from "../../store/useSelectedChatStore";

export const MessageUser = ({ otherParticipantId }: { otherParticipantId: string }) => {
  const initiateChat = httpsCallable(functions, "initiateChat");
  const { setSelectedChatId } = useSelectedChatStore();

  const {
    data: chatId,
    mutate: initiateChatMutate,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const response = await initiateChat({ otherParticipantId: otherParticipantId });
      return response.data as Pick<ChatExistenceInformation, "chatId">;
    },
  });

  const handleMessageButtonClick = () => {
    if (!otherParticipantId) return;
    initiateChatMutate();
  };

  if (chatId) {
    setSelectedChatId(chatId);
  }

  return (
    <button className="btn btn-primary" onClick={handleMessageButtonClick}>
      {isPending ? <Loader /> : "Message"}
    </button>
  );
};
