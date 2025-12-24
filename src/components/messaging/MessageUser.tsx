import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import { getUserId } from "../../services/authentication/authServices";
import type { ChatExistenceInformation } from "../../../shared/types/ChatExistenceInformtion";

export const MessageUser = ({ otherParticipantId }: { otherParticipantId: string }) => {
  const initiateChat = httpsCallable(functions, "initiateChat");

  const { data: userId, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.USER_ID],
    queryFn: getUserId,
  });

  const {
    data: chatId,
    isLoading: chatInitiationOngoing,
    isError: chatInitiationError,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER_SPECIFIC_CHAT_ID, userId, otherParticipantId],
    queryFn: async () => {
      const response = await initiateChat({ chatInitiatorId: userId, otherParticipantId: otherParticipantId });
      return response.data as Pick<ChatExistenceInformation, "chatId">;
    },
    enabled: Boolean(userId) && Boolean(otherParticipantId),
  });

  return <button className="btn btn-primary">Message</button>;
};
