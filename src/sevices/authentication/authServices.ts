import { createUserWithEmailAndPassword } from "firebase/auth";
import { firestore, auth, analytics } from "../firebaseConfig";
import { handleFirebaseError } from "./firebaseErrorHandler";

export const createUserByEmail = async (email: string, password: string) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredentials.user;
  } catch (error: any) {
    console.log(handleFirebaseError(error).message);
  }
};
