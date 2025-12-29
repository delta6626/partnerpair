import { useEffect, useState } from "react";
import { MESSAGES } from "../../../shared/constants/MESSAGES";
import { useSelectedChatStore } from "../../store/useSelectedChatStore";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "../../services/firebaseConfig";
import type { ChatMessage } from "../../../shared/types/ChatMessage";
import { Loader } from "../Loader";
import { useSelectedChatMetaDataStore } from "../../store/useSelectedChatMetaData";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import { getUserId } from "../../services/authentication/authServices";

export const ChatViewer = () => {
  const { selectedChatId } = useSelectedChatStore();
  const { selectedChatMetaData } = useSelectedChatMetaDataStore();

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState<boolean>(true);
  const [messagesLoadingError, setMessagesLoadingError] = useState<boolean>(false);
  const [messagesLoadingErrorMessage, setMessagesLoadingErrorMessage] = useState<string>("");

  const {
    data: userId,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER_ID],
    queryFn: getUserId,
  });

  useEffect(() => {
    if (!selectedChatId) return;

    const chatMessagesQuery = query(
      collection(firestore, "chats", selectedChatId, "messages"),
      orderBy("sentAt", "asc")
    );

    const unsubscribe = onSnapshot(
      chatMessagesQuery,
      (snapshot) => {
        const messages: ChatMessage[] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ChatMessage));
        setChatMessages(messages);
        setMessagesLoading(false);
      },
      (error) => {
        setMessagesLoading(false);
        setMessagesLoadingError(true);
        setMessagesLoadingErrorMessage(error.message);
      }
    );

    return () => unsubscribe();
  }, [selectedChatId]);

  return (
    <div className="w-full flex flex-1 bg-base-200 rounded-3xl">
      {!selectedChatId && (
        <div className="flex flex-col flex-1 items-center justify-center text-accent">
          <p>{MESSAGES.NO_CHAT_OPENED}</p>
          <br />
          <p>{MESSAGES.START_MESSAGING}</p>
        </div>
      )}

      {(isLoading || messagesLoading) && selectedChatId && (
        <div className="flex flex-col flex-1 items-center justify-center">
          <Loader />
        </div>
      )}

      {(isError || messagesLoadingError) && (
        <div className="flex flex-col flex-1 items-center justify-center text-error/60">
          <p>An error occured while loading messages.</p>
          <br />
          <p>{error instanceof Error ? error.message : messagesLoadingErrorMessage}</p>
        </div>
      )}

      {!isLoading &&
        !isError &&
        !messagesLoading &&
        !messagesLoadingError &&
        userId &&
        selectedChatId &&
        selectedChatMetaData && <div className="flex h-fit items-center"></div>}
    </div>
  );
};
