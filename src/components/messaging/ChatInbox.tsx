import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../../services/firebaseConfig";
import { useState, useEffect } from "react";
import type { ChatMetaData } from "../../../shared/types/ChatMetaData";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../shared/constants/QUERY_KEYS";
import { getUserId } from "../../services/authentication/authServices";
import { Loader } from "../Loader";

export const ChatInbox = () => {
  const [chats, setChats] = useState<ChatMetaData[]>([]);
  const [chatsLoading, setChatsLoading] = useState<boolean>(true);
  const [chatsLoadingError, setChatsLoadingError] = useState<boolean>(false);
  const [chatsLoadingErrorMessage, setChatsLoadingErrorMessage] = useState<string>("");

  const {
    data: userId,
    isLoading,
    isError,
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
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
