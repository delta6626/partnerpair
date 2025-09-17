import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAdditionalUserInfo,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  type AdditionalUserInfo,
  type User as UserAccount,
  type UserCredential,
} from "firebase/auth";
import { firestore, auth } from "../firebaseConfig";
import { handleFirebaseError } from "./firebaseErrorHandler";
import type { User } from "../../types/User";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { SIGNUP } from "../../constants/SIGNUP";
import { GoogleAuthProvider } from "firebase/auth";
import { splitUsername } from "../../utils/splitUsername";
import { SETTINGS } from "../../constants/SETTINGS";

export const createUserByEmail = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string
) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

    let user: User = {
      basicInfo: {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        email: email,
        phone: null,
        location: null,
        verified: false,
        tier: "Basic",
        authenticationMethod: "Email",
        profileImageUrl: SETTINGS.PROFILE_PHOTOS.PROFILE_PHOTO_1,
        profileCompleted: false,
        createdAt: new Date(),
        lastActiveAt: new Date(),
      },

      professionalInfo: {
        headline: "",
        bio: "",
        skills: [],
        roles: [],
        education: [],
        hasStartup: null,
        hasStartupIdea: null,
        startupDescription: "",
        startupStage: "idea",
        wantsToCofound: null,
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
        linkedin: "",
        twitter: "",
        github: "",
        website: "",
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

export const loginUserByEmail = async (email: string, password: string) => {
  // Log in the user and return their ID.
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    return userCredentials as UserCredential;
  } catch (error: any) {
    return handleFirebaseError(error);
  }
};

const addUserToDatabase = async (user: User, userId: string) => {
  await setDoc(doc(firestore, "users", userId), user);
  return user;
};

export const getAuthenticatedUser = async () => {
  return new Promise<UserAccount | string>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(SIGNUP.UNAUTHENTICATED);
      }
    });
  });
};

export const getUserId = async () => {
  // Get user id
  const user: string | UserAccount = await getAuthenticatedUser();

  if (typeof user === "string") return SIGNUP.UNAUTHENTICATED;
  else {
    return user.uid;
  }
};

export const getUserData = async () => {
  // Get the user data from firestore

  const userId = await getUserId();
  if (userId === SIGNUP.UNAUTHENTICATED) return SIGNUP.UNAUTHENTICATED;

  const userDocRef = doc(firestore, "users", userId);
  try {
    const userDataDocument = await getDoc(userDocRef);
    const userData = userDataDocument.data() as User;
    return userData;
  } catch (error: any) {
    return handleFirebaseError(error);
  }
};

export const sendVerificationMail = async () => {
  if (!auth.currentUser) return false;
  try {
    await sendEmailVerification(auth.currentUser);
    console.log(auth.currentUser);
    return true;
  } catch (error: any) {
    return handleFirebaseError(error);
  }
};

export const getVerificationStatus = async () => {
  if (!auth.currentUser) return false;
  try {
    await auth.currentUser.reload();
    return auth.currentUser.emailVerified;
  } catch (error: any) {
    return handleFirebaseError(error);
  }
};

export const signInWithGoogle = async () => {
  const provider: GoogleAuthProvider = new GoogleAuthProvider();

  try {
    const userCredentials: UserCredential = await signInWithPopup(auth, provider);
    const extraInformation: AdditionalUserInfo | null = getAdditionalUserInfo(userCredentials);

    if (extraInformation?.isNewUser) {
      let user: User = {
        basicInfo: {
          firstName: userCredentials.user.displayName
            ? splitUsername(userCredentials.user.displayName, 0)
            : "PartnerPair User",
          lastName: userCredentials.user.displayName
            ? splitUsername(userCredentials.user.displayName, 1)
            : "PartnerPair User",
          dateOfBirth: new Date().toISOString(),
          email: userCredentials.user.email ? userCredentials.user.email : "No Email",
          phone: null,
          location: null,
          verified: true,
          tier: "Basic",
          authenticationMethod: "Google",
          profileImageUrl: SETTINGS.PROFILE_PHOTOS.PROFILE_PHOTO_1,
          profileCompleted: false,
          createdAt: new Date(),
          lastActiveAt: new Date(),
        },

        professionalInfo: {
          headline: "",
          bio: "",
          skills: [],
          roles: [],
          education: [],
          hasStartup: null,
          hasStartupIdea: null,
          startupDescription: "",
          startupStage: "idea",
          wantsToCofound: null,
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
          linkedin: "",
          twitter: "",
          github: "",
          website: "",
        },
      };

      try {
        // Attempt Firestore write
        await addUserToDatabase(user, userCredentials.user.uid);
        return userCredentials;
      } catch (firestoreError: any) {
        // Rollback: delete Auth user if Firestore fails
        await deleteUser(userCredentials.user);
        return handleFirebaseError(firestoreError);
      }
    } else {
      return userCredentials;
    }
  } catch (error: any) {
    return handleFirebaseError(error);
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
    return SIGNUP.SIGNOUT_SUCCESS;
  } catch (error: any) {
    return handleFirebaseError(error);
  }
};
