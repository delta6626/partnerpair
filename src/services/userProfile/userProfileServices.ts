import { SIGNUP } from "../../../shared/constants/SIGNUP";
import { getUserId } from "../authentication/authServices";
import { handleFirebaseError } from "../authentication/firebaseErrorHandler";
import { firestore, storage } from "../firebaseConfig";
import { collection, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import type { User } from "../../../shared/types/User";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { trimAllSpaces } from "../../../shared/utils/trimAllSpaces";

export const setVerificationStatus = async (status: boolean) => {
  const userId = await getUserId();
  if (userId === SIGNUP.UNAUTHENTICATED) return SIGNUP.UNAUTHENTICATED;

  const userDocRef = doc(firestore, "users", userId);

  try {
    await updateDoc(userDocRef, { "basicInfo.verified": status });
    return true;
  } catch (error: any) {
    return handleFirebaseError(error);
  }
};

export const updateUserProfile = async (updatedUserProfile: User, chatMetaDataChanged: boolean) => {
  const userId = await getUserId();
  const userDocRef = doc(firestore, "users", userId);

  try {
    const batch = writeBatch(firestore);

    // Update the user
    batch.set(userDocRef, updatedUserProfile, { merge: true });

    // Update chat metadata if needed
    if (chatMetaDataChanged) {
      const chatsRef = collection(firestore, "chats");
      const chatsQuery = query(chatsRef, where("participants", "array-contains", userId));
      const chatsSnapshot = await getDocs(chatsQuery);

      chatsSnapshot.forEach((docSnap) => {
        batch.update(docSnap.ref, {
          [`participantNames.${userId}`]: `${updatedUserProfile.basicInfo.firstName} ${updatedUserProfile.basicInfo.lastName}`,
          [`participantHeadlines.${userId}`]: updatedUserProfile.professionalInfo.headline ?? "",
          [`participantProfileImageUrls.${userId}`]: updatedUserProfile.basicInfo.profileImageUrl ?? null,
        });
      });
    }

    await batch.commit();

    return true;
  } catch (error: any) {
    return handleFirebaseError(error);
  }
};

export const uploadUserPhoto = async (photo: File) => {
  const userId = await getUserId();

  if (userId === SIGNUP.UNAUTHENTICATED) {
    return false;
  }

  try {
    const storageRef = ref(storage, `profilePhotos/${userId}/${photo.name}`);
    const snapshot = await uploadBytes(storageRef, photo);
    const photoURL = await getDownloadURL(snapshot.ref);

    return photoURL;
  } catch (error: any) {
    return false;
  }
};
