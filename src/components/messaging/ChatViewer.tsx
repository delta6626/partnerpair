import { useEffect, useState, type FormEvent } from "react";
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
import { formatDate } from "../../../shared/utils/formatDate";

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

  const otherParticipantId =
    selectedChatMetaData && userId ? selectedChatMetaData.participants.find((id) => id !== userId) : null;

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
  };

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
        otherParticipantId &&
        selectedChatId &&
        selectedChatMetaData && (
          <div className="w-full flex-col flex items-center">
            <h1 className="rounded-3xl text-center text-accent border border-accent mt-16 w-fit py-2 px-4">
              {formatDate(selectedChatMetaData.createdAt, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h1>

            <div className="flex flex-col h-fit items-center justify-center mt-8">
              <img
                className="w-30 h-30 rounded-full"
                src={selectedChatMetaData.participantProfileImageUrls[otherParticipantId]}
              ></img>

              <h1 className="text-lg font-medium">{selectedChatMetaData.participantNames[otherParticipantId]}</h1>
              <p className="text-accent">{selectedChatMetaData.participantHeadlines[otherParticipantId]}</p>
            </div>

            {chatMessages && chatMessages.length === 0 && (
              <div className="w-full flex flex-1 items-center justify-center">
                <p className="text-accent">{MESSAGES.NO_MESSAGES}</p>
              </div>
            )}

            {chatMessages && chatMessages.length > 0 && (
              <div className="w-full flex flex-1 items-center justify-center">
                {chatMessages.map((message) => (
                  <h1 key={message.id}>{message.content}</h1>
                ))}
              </div>
            )}

            <form className="mb-4 flex gap-2" onSubmit={handleSendMessage}>
              <input className="input w-120" placeholder={MESSAGES.WRITE_MESSAGE}></input>
              <button className="btn btn-primary" onClick={handleSendMessage}>
                Send
              </button>
            </form>
          </div>
        )}
    </div>
  );
};
