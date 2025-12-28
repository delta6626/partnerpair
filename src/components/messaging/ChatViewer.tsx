import { useEffect } from "react";
import { MESSAGES } from "../../../shared/constants/MESSAGES";
import { useSelectedChatStore } from "../../store/useSelectedChatStore";
import { collection, orderBy, query } from "firebase/firestore";
import { firestore } from "../../services/firebaseConfig";

export const ChatViewer = () => {
  const { selectedChatId } = useSelectedChatStore();

  useEffect(() => {
    if (!selectedChatId) return;
    const chatMessages = query(collection(firestore, "chats", selectedChatId, "messages"), orderBy("sentAt", "asc"));
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
