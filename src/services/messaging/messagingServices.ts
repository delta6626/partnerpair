import { collection, doc, increment, runTransaction } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { handleFirebaseError } from "../authentication/firebaseErrorHandler";

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

export const deleteChat = async () => {};
