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

    // await updateChatMetaData(); // TODO: Implement this function to update chat metadata after adding a message

    return true;
  } catch (error) {
    return handleFirebaseError(error);
  }
};

const updateChatMetaData = async (
  chatId: string,
  lastMessageSenderId: string,
  lastMessageContent: string,
  lastMessageAt: Date,
  otherParticipantId: string
) => {};
