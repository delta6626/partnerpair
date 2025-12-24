import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import type { ChatExistenceInformation } from "../../../shared/types/ChatExistenceInformtion";
import { Loader } from "../Loader";

export const MessageUser = ({ otherParticipantId }: { otherParticipantId: string }) => {
  const initiateChat = httpsCallable(functions, "initiateChat");

  const {
    data: chatId,
    isLoading: chatInitiationOngoing,
    isError: chatInitiationError,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER_SPECIFIC_CHAT_ID, otherParticipantId],
    queryFn: async () => {
      const response = await initiateChat({ otherParticipantId: otherParticipantId });
      return response.data as Pick<ChatExistenceInformation, "chatId">;
    },
    enabled: false,
  });

  const handleMessageButtonClick = () => {
    if (!otherParticipantId) return;
    refetch();
  };

  return (
    <button className="btn btn-primary" onClick={handleMessageButtonClick}>
      {chatInitiationOngoing ? <Loader /> : "Message"}
    </button>
  );
};
