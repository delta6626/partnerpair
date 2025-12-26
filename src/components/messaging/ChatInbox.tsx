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

export const ChatInbox = () => {
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
            } as ChatMetaData)
        );
        setChats(updatedChats);
        setChatsLoading(false);
      },
      (error) => {
        setChatsLoadingError(true);
        setChatsLoadingErrorMessage(error.message);
        setChatsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  console.log(chats);

  return (
    <div className="flex min-w-120 flex-col gap-4">
      <input
        className="input w-full border-none"
        type="text"
        placeholder={"Search chats"}
        value={searchTerm}
        onChange={handleSearchTermChange}
      />

      <div className="flex flex-1 bg-base-200 rounded-3xl">
        {(isLoading || chatsLoading) && (
          <div className="flex flex-1 items-center justify-center">
            <Loader />
          </div>
        )}

        {(isError || chatsLoadingError) && (
          <div className="flex flex-1 items-center justify-center text-error">
            Error loading chats: {error instanceof Error ? error.message : chatsLoadingErrorMessage} Please try again
            later.
          </div>
        )}

        {chats.length === 0 && !isLoading && !chatsLoading && !isError && !chatsLoadingError && (
          <div className="p-4 flex flex-col flex-1 items-center justify-center text-center text-accent">
            <h1>
              {MESSAGES.NO_CHATS_FOUND} <br></br>
              {MESSAGES.BROWSE_PROFILES}
            </h1>

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
          <div className="p-4 w-full flex flex-col gap-2 overflow-y-auto">
            {filteredChats.map((chat) => {
              return <ChatCard chat={chat} currentUserId={userId ?? ""} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
