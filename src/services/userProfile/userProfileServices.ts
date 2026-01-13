import { SIGNUP } from "../../../shared/constants/SIGNUP";
import { getUserId } from "../authentication/authServices";
import { handleFirebaseError } from "../authentication/firebaseErrorHandler";
import { firestore, storage } from "../firebaseConfig";
import { collection, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import type { User } from "../../../shared/types/User";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes, type StorageReference } from "firebase/storage";

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

const deleteAllUserPhotos = async (userFolderRef: StorageReference) => {
  try {
    const existingFiles = await listAll(userFolderRef);
    await Promise.all(existingFiles.items.map((fileRef) => deleteObject(fileRef)));
    return true; // all deletes resolved
  } catch (error) {
    console.error(error);
    return false; // at least one delete failed
  }
};

export const uploadUserPhoto = async (photo: File) => {
  const userId = await getUserId();

  if (userId === SIGNUP.UNAUTHENTICATED) {
    return false;
  }

  try {
    const userFolderRef = ref(storage, `profilePhotos/${userId}/`);

    // Delete existing profile photos
    const photosDeleted = await deleteAllUserPhotos(userFolderRef);
    if (!photosDeleted) return false; // If photos cannot be deleted, cancel upload operation.

    const newPhotoRef = ref(storage, `profilePhotos/${userId}/${photo.name}`);
    const snapshot = await uploadBytes(newPhotoRef, photo);

    const photoURL = await getDownloadURL(snapshot.ref);

    return photoURL;
  } catch (error: any) {
    console.error(error);
    return false;
  }
};
