import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import type { ChatExistenceInformation } from "../../../shared/types/ChatExistenceInformtion";
import { Loader } from "../Loader";

export const MessageUser = ({ otherParticipantId }: { otherParticipantId: string }) => {
  const initiateChat = httpsCallable(functions, "initiateChat");

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
    // navigate the user to Message page and set selectedChatId zustand store to chatId
  }

  return (
    <button className="btn btn-primary" onClick={handleMessageButtonClick}>
      {isPending ? <Loader /> : "Message"}
    </button>
  );
};
