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
    <div className="flex min-w-100 flex-col gap-4">
      <input className="input w-full bg-base-200 border-none" type="text" placeholder={"Search chats"} />
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

        {chats.length > 0 && (
          <div className="">
            {chats.map((chat) => {
              return <ChatCard chat={chat} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
