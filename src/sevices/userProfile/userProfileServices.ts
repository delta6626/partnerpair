import type { User } from "firebase/auth";
import { SIGNUP } from "../../constants/SIGNUP";
import { getUserId } from "../authentication/authServices";
import { handleFirebaseError } from "../authentication/firebaseErrorHandler";
import { firestore } from "../firebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";

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

export const updateUserProfile = async (updatedUserProfile: User) => {
  const userId = await getUserId();
  const userDocRef = doc(firestore, "users", userId);

  try {
    await setDoc(userDocRef, updatedUserProfile);
  } catch (error: any) {
    return handleFirebaseError(error);
  }
};
