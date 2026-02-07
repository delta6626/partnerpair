import { SIGNUP } from "../../../shared/constants/SIGNUP";
import { getUserId } from "../authentication/authServices";
import { handleFirebaseError } from "../authentication/firebaseErrorHandler";
import { firestore, storage } from "../firebaseConfig";
import { collection, doc, getDoc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import type { User } from "../../../shared/types/User";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { SETTINGS } from "../../../shared/constants/SETTINGS";

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

export const deleteAllUserPhotos = async () => {
  const userId = await getUserId();

  if (userId === SIGNUP.UNAUTHENTICATED) {
    return false;
  }

  const userFolderRef = ref(storage, `profilePhotos/${userId}/`);

  try {
    const existingFiles = await listAll(userFolderRef);
    if (existingFiles.items.length === 0) return true;

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
    // Delete existing profile photos
    const photosDeleted = await deleteAllUserPhotos();
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

export const getContactAdditionElligibilityStatus = async () => {
  const userId = await getUserId();

  if (userId === SIGNUP.UNAUTHENTICATED) return false;

  const documentRef = doc(firestore, "users", userId);
  const documentSnap = await getDoc(documentRef);
  if (!documentSnap.exists()) return false;

  const userData: User = documentSnap.data() as User;

  if (userData.basicInfo.tier === "Pro") return true;
  if (userData.basicInfo.tier === "Basic" && userData.basicInfo.contactList.length < SETTINGS.BASIC_MAX_CONTACTS)
    return true;

  return false;
};
