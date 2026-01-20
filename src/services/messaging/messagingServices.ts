import { addDoc, collection, doc, getDocs, increment, query, runTransaction, where } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { handleFirebaseError } from "../authentication/firebaseErrorHandler";
import { getUserId } from "../authentication/authServices";
import { SIGNUP } from "../../../shared/constants/SIGNUP";
import type { AbuseReport } from "../../../shared/types/AbuseReport";

export const addChatMessage = async (chatId: string, senderId: string, otherParticipantId: string, content: string) => {
  if (!chatId || !senderId || !otherParticipantId || !content) return false;

  try {
    await runTransaction(firestore, async (transaction) => {
      const messagesRef = collection(firestore, "chats", chatId, "messages");
      const chatRef = doc(firestore, "chats", chatId);

      const messageRef = doc(messagesRef); // generate ID first

      transaction.set(messageRef, {
        senderId,
        content: content.trim(),
        sentAt: new Date(),
      });

      transaction.update(chatRef, {
        lastMessage: content.trim(),
        lastMessageSenderId: senderId,
        lastMessageAt: new Date(),
        [`unreadCount.${otherParticipantId}`]: increment(1),
      });
    });

    return true;
  } catch (error) {
    return handleFirebaseError(error);
  }
};

export const zeroUnreadCount = async (chatId: string, userId: string) => {
  if (!chatId || !userId) return false;

  try {
    await runTransaction(firestore, async (transaction) => {
      const chatRef = doc(firestore, "chats", chatId);

      transaction.update(chatRef, {
        [`unreadCount.${userId}`]: 0,
      });
    });

    return true;
  } catch (error) {
    return handleFirebaseError(error);
  }
};

export const getAllUnreadMessageCount = async () => {
  const userId = await getUserId();

  if (userId === SIGNUP.UNAUTHENTICATED) throw new Error(SIGNUP.UNAUTHENTICATED);

  const chatsRef = collection(firestore, "chats");
  const chatsQuery = query(chatsRef, where("participants", "array-contains", userId));
  const chatsSnapshot = await getDocs(chatsQuery);

  let unreadCount = 0;

  chatsSnapshot.docs.forEach((doc) => {
    const chatData = doc.data();
    unreadCount += chatData.unreadCount[userId] ?? 0;
  });

  return unreadCount;
};

export const submitAbuseReport = async (abuseReport: AbuseReport) => {
  const abuseReportsCollection = collection(firestore, "abuseReports");

  try {
    await addDoc(abuseReportsCollection, abuseReport);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
