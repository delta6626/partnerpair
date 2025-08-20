import { SIGNUP } from "../../constants/SIGNUP";
import { getUserId } from "../authentication/authServices";
import { handleFirebaseError } from "../authentication/firebaseErrorHandler";
import { firestore } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

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
