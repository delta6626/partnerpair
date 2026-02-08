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
import type { User } from "../../../shared/types/User";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { SIGNUP } from "../../../shared/constants/SIGNUP";
import { GoogleAuthProvider } from "firebase/auth";
import { splitUsername } from "../../../shared/utils/splitUsername";
import { SETTINGS } from "../../../shared/constants/SETTINGS";

export const createUserByEmail = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

    const user: User = {
      basicInfo: {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        email: email,
        phone: "",
        location: "",
        verified: false,
        tier: "Basic",
        authenticationMethod: "Email",
        profileImageUrl: `${SETTINGS.DICEBEAR_API_URL}${firstName}`,
        profileCompleted: false,
        contactList: [],
        createdAt: new Date(),
        lastActiveAt: new Date(),
        emailNotificationsAllowed: true,
      },

      professionalInfo: {
        headline: "",
        bio: "",
        skills: [],
        roles: [],
        commitmentLevel: null,
        availability: null,
        education: [],
        hasStartup: null,
        startupDescription: "",
        startupStage: null,
        wantsToCofound: null,
      },

      matchingPreferences: {
        lookingForSkills: [],
        lookingForRoles: [],
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

  provider.setCustomParameters({
    prompt: "select_account",
  });

  try {
    const userCredentials: UserCredential = await signInWithPopup(auth, provider);
    const extraInformation: AdditionalUserInfo | null = getAdditionalUserInfo(userCredentials);

    if (extraInformation?.isNewUser) {
      const googleProfileFirstName = userCredentials.user.displayName
        ? splitUsername(userCredentials.user.displayName, 0)
        : "PartnerPair User";

      const googleProfileLastName = userCredentials.user.displayName
        ? splitUsername(userCredentials.user.displayName, 1)
        : "PartnerPair User";

      const user: User = {
        basicInfo: {
          firstName: googleProfileFirstName,
          lastName: googleProfileLastName,
          dateOfBirth: "",
          email: userCredentials.user.email ? userCredentials.user.email : "No Email",
          phone: "",
          location: "",
          verified: true,
          tier: "Basic",
          authenticationMethod: "Google",
          profileImageUrl: userCredentials.user.photoURL ?? `${SETTINGS.DICEBEAR_API_URL}${googleProfileFirstName}`,
          profileCompleted: false,
          contactList: [],
          createdAt: new Date(),
          lastActiveAt: new Date(),
          emailNotificationsAllowed: true,
        },

        professionalInfo: {
          headline: "",
          bio: "",
          skills: [],
          roles: [],
          commitmentLevel: null,
          availability: null,
          education: [],
          hasStartup: null,
          startupDescription: "",
          startupStage: null,
          wantsToCofound: null,
        },

        matchingPreferences: {
          lookingForSkills: [],
          lookingForRoles: [],
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
