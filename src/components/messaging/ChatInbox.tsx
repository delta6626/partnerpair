import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../../services/firebaseConfig";
import { useState, useEffect } from "react";
import type { ChatMetaData } from "../../../shared/types/ChatMetaData";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import { getUserId } from "../../services/authentication/authServices";
import { Loader } from "../Loader";
import { MESSAGES } from "../../../shared/constants/MESSAGES";
import { Link } from "react-router-dom";
import { ChatCard } from "./ChatCard";
import { useSelectedChatStore } from "../../store/useSelectedChatStore";
import { useSelectedChatMetaDataStore } from "../../store/useSelectedChatMetaData";

export const ChatInbox = () => {
  const { selectedChatId } = useSelectedChatStore();
  const { setSelectedChatMetaData } = useSelectedChatMetaDataStore();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [chats, setChats] = useState<ChatMetaData[]>([]);
  const [chatsLoading, setChatsLoading] = useState<boolean>(true);
  const [chatsLoadingError, setChatsLoadingError] = useState<boolean>(false);
  const [chatsLoadingErrorMessage, setChatsLoadingErrorMessage] = useState<string>("");

  const {
    data: userId,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER_ID],
    queryFn: getUserId,
  });

  const filteredChats = chats.filter((chat) => {
    const otherParticipantId = chat.participants.find((id) => id !== userId)!;
    const participantName = chat.participantNames[otherParticipantId].toLowerCase();
    return participantName.includes(searchTerm.toLowerCase());
  });

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!userId) return;

    const chatsQuery = query(collection(firestore, "chats"), where("participants", "array-contains", userId));

    const unsubscribe = onSnapshot(
      chatsQuery,
      (snapshot) => {
        const updatedChats = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as ChatMetaData,
        );
        setChats(updatedChats);
        setChatsLoading(false);
      },
      (error) => {
        setChatsLoadingError(true);
        setChatsLoadingErrorMessage(error.message);
        setChatsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (!selectedChatId) {
      setSelectedChatMetaData(null);
      return;
    }

    const metaData = chats.find((chat) => chat.id === selectedChatId) || null;
    setSelectedChatMetaData(metaData);
  }, [selectedChatId, chats]);

  return (
    <div className="flex xl:min-w-100 2xl:min-w-120 flex-col gap-4">
      <input
        className="input w-full"
        type="text"
        placeholder={"Search chats"}
        value={searchTerm}
        onChange={handleSearchTermChange}
      />

      <div className="flex flex-1 xl:max-h-[calc(100vh-264px)] xl:min-h-[calc(100vh-264px)] bg-base-200 border border-base-100 rounded-3xl">
        {(isLoading || chatsLoading) && (
          <div className="flex flex-1 items-center justify-center">
            <Loader />
          </div>
        )}

        {(isError || chatsLoadingError) && (
          <div className="flex flex-1 items-center justify-center text-error/60">
            Error loading chats: {error instanceof Error ? error.message : chatsLoadingErrorMessage} Please try again
            later.
          </div>
        )}

        {chats.length === 0 && !isLoading && !chatsLoading && !isError && !chatsLoadingError && (
          <div className="p-4 flex flex-col flex-1 items-center justify-center text-center text-accent">
            <p>
              {MESSAGES.NO_CHATS_FOUND} <br></br>
              {MESSAGES.BROWSE_PROFILES}
            </p>

            <Link className="btn btn-primary mt-4" to={"/browse"}>
              Browse
            </Link>
          </div>
        )}

        {filteredChats.length === 0 && chats.length > 0 && (
          <div className="p-4 flex flex-1 items-center justify-center text-center text-accent">
            <h1>{MESSAGES.NO_FILTERED_CHATS}</h1>
          </div>
        )}

        {filteredChats.length > 0 && (
          <div className="p-4 w-full flex xl:flex-col gap-2 overflow-y-auto scrollbar-thin xl:scrollbar-none">
            {filteredChats.map((chat) => {
              return <ChatCard chat={chat} currentUserId={userId ?? ""} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
