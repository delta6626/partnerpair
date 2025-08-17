import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { firestore, auth, analytics } from "../firebaseConfig";
import { handleFirebaseError } from "./firebaseErrorHandler";
import type { User } from "../../types/User";
import { doc, setDoc } from "firebase/firestore";

export const createUserByEmail = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    let user: User = {
      basicInfo: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: null,
        location: null,
        verified: false,
        tier: "Basic",
        authenticationMethod: "Email",
        profileImageUrl: null,
        profileCompleted: false,
        createdAt: new Date(),
        lastActiveAt: new Date(),
      },

      professionalInfo: {
        headline: null,
        bio: null,
        skills: [],
        roles: [],
        education: [],
      },

      matchingPreferences: {
        lookingForSkills: [],
        lookingForRoles: [],
        preferredLocation: null,
        commitmentLevel: null,
        availability: null,
        preferredCompanyStage: [],
      },

      socialLinks: {
        linkedin: null,
        twitter: null,
        github: null,
        website: null,
      },
    };

    try {
      // Attempt Firestore write
      await addUserToDatabase(user, userCredentials.user.uid);
      return user;
    } catch (firestoreError: any) {
      // Rollback: delete Auth user if Firestore fails
      await deleteUser(userCredentials.user);
      return handleFirebaseError(firestoreError);
    }
  } catch (error: any) {
    return handleFirebaseError(error);
  }
};

const addUserToDatabase = async (user: User, userId: string) => {
  await setDoc(doc(firestore, "users", userId), user);
  return user;
};
