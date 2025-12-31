import { useEffect, useRef, useState } from "react";
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
import { MessageInput } from "./MessageInput";
import { ChatBubble } from "./ChatBubble";

export const ChatViewer = () => {
  const { selectedChatId } = useSelectedChatStore();
  const { selectedChatMetaData } = useSelectedChatMetaDataStore();

  const scrollToDiv = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!scrollToDiv.current) return;
    scrollToDiv.current.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    /* The height of the Navbar, page title and subtitle and
      the footer combines to a total of 312px. Therefore, to make the ChatInbox component take the remaining height of
      the viewport, we subtract 312px from 100vh. */

    <div className="w-full flex flex-1 bg-base-200 rounded-3xl max-h-[calc(100vh-312px)] overflow-y-scroll scrollbar-none">
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
            <h1 className="rounded-3xl text-center text-accent border border-accent mt-8 w-fit py-2 px-4">
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
              <div className="w-full flex flex-col gap-2 p-4 flex-1 items-center justify-center">
                {chatMessages.map((message) => (
                  <ChatBubble
                    key={message.id}
                    message={message}
                    currentUserId={userId}
                    otherParticipantId={otherParticipantId}
                  />
                ))}
              </div>
            )}

            {userId && <MessageInput currentUserId={userId} />}
            <div ref={scrollToDiv}></div>
          </div>
        )}
    </div>
  );
};
