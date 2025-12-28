import { useEffect, useState } from "react";
import { MESSAGES } from "../../../shared/constants/MESSAGES";
import { useSelectedChatStore } from "../../store/useSelectedChatStore";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "../../services/firebaseConfig";
import type { ChatMessage } from "../../../shared/types/ChatMessage";

export const ChatViewer = () => {
  const { selectedChatId } = useSelectedChatStore();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState<boolean>(true);
  const [messagesLoadingError, setMessagesLoadingError] = useState<boolean>(false);
  const [messagesLoadingErrorMessage, setMessagesLoadingErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!selectedChatId) return;

    const chatMessagesQuery = query(
      collection(firestore, "chats", selectedChatId, "messages"),
      orderBy("sentAt", "asc")
    );

    const unsubscribe = onSnapshot(chatMessagesQuery, (snapshot) => {
      const messages: ChatMessage[] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ChatMessage));
      setChatMessages(messages);
    });

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
    </div>
  );
};
