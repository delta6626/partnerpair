import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { handleFirebaseError } from "../authentication/firebaseErrorHandler";

export const addChatMessage = async (chatId: string, senderId: string, content: string) => {
  if (!chatId || !senderId || !content) return false;

  const messagesCollectionRef = collection(firestore, "chats", chatId, "messages");

  try {
    await addDoc(messagesCollectionRef, {
      senderId,
      content: content.trim(),
      sentAt: new Date(),
    });

    return true;
  } catch (error) {
    return handleFirebaseError(error);
  }
};
