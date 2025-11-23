import * as admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import { UserTier } from "./shared/types/UserTier";
import { User } from "./shared/types/User";
import { DisplayableUserPro } from "./shared/types/DisplayableUserPro";
import { DisplayableUserBasic } from "./shared/types/DisplayableUserBasic";
import { ViewerMetaData } from "./shared/types/ViewerMetaData";
import { Timestamp } from "firebase-admin/firestore";
import { getProfileViewCountWithinTimePeriod } from "./shared/utils/getProfileViewCountWithinTimePeriod";
import { Contact } from "./shared/types/Contact";
import { compatibilityScore } from "./shared/utils/compatibilityScore";

admin.initializeApp();

const db = getFirestore();

// shared internal functions

const fetchUserData = async (userId: string): Promise<User> => {
  const userDoc = await db.collection("users").doc(userId).get();
  if (!userDoc.exists) throw new HttpsError("not-found", "The user data doesn't exist.");
  const userData = userDoc.data() as User;
  return userData;
};

const fetchUserTier = async (userId: string): Promise<UserTier> => {
  const userData = await fetchUserData(userId);
  const userTier = userData.basicInfo.tier;
  return userTier;
};

const getVisitedUserProfileDataPro = async (visitedUserId: string) => {
  const visitedUserDoc = await db.collection("users").doc(visitedUserId).get();
  if (!visitedUserDoc.exists) throw new HttpsError("not-found", "This user does not exist.");

  const visitedUserData = visitedUserDoc.data() as User;
  const displayableVisitedUserData: DisplayableUserPro = {
    basicInfo: {
      firstName: visitedUserData.basicInfo.firstName,
      lastName: visitedUserData.basicInfo.lastName,
      dateOfBirth: visitedUserData.basicInfo.dateOfBirth,
      phone: visitedUserData.basicInfo.phone,
      location: visitedUserData.basicInfo.location,
      profileImageUrl: visitedUserData.basicInfo.profileImageUrl,
      createdAt: visitedUserData.basicInfo.createdAt,
      lastActiveAt: visitedUserData.basicInfo.lastActiveAt,
      tier: visitedUserData.basicInfo.tier,
    },
    professionalInfo: visitedUserData.professionalInfo,
    matchingPreferences: visitedUserData.matchingPreferences,
    socialLinks: visitedUserData.socialLinks,
  };

  return displayableVisitedUserData;
};

const getVisitedUserProfileDataBasic = async (visitedUserId: string) => {
  const visitedUserDoc = await db.collection("users").doc(visitedUserId).get();
  if (!visitedUserDoc.exists) throw new HttpsError("not-found", "This user does not exist.");

  const visitedUserData = visitedUserDoc.data() as User;
  const displayableVisitedUserData: DisplayableUserBasic = {
    basicInfo: {
      firstName: visitedUserData.basicInfo.firstName,
      lastName: visitedUserData.basicInfo.lastName,
      location: visitedUserData.basicInfo.location,
      tier: visitedUserData.basicInfo.tier,
      profileImageUrl: visitedUserData.basicInfo.profileImageUrl,
      lastActiveAt: visitedUserData.basicInfo.lastActiveAt,
    },

    professionalInfo: {
      headline: visitedUserData.professionalInfo.headline,
      bio: visitedUserData.professionalInfo.bio,
      skills: visitedUserData.professionalInfo.skills,
      roles: visitedUserData.professionalInfo.roles,
      hasStartup: visitedUserData.professionalInfo.hasStartup,
      startupDescription: visitedUserData.professionalInfo.startupDescription,
      startupStage: visitedUserData.professionalInfo.startupStage,
      wantsToCofound: visitedUserData.professionalInfo.wantsToCofound,
    },

    matchingPreferences: {
      lookingForSkills: visitedUserData.matchingPreferences.lookingForSkills,
      lookingForRoles: visitedUserData.matchingPreferences.lookingForRoles,
      preferredCompanyStage: visitedUserData.matchingPreferences.preferredCompanyStage,
    },
  };

  return displayableVisitedUserData;
};

const addProfileViewRecord = async (userId: string, visitedUserId: string) => {
  if (userId === visitedUserId) return; // Ignore self views.

  const userData = await fetchUserData(userId);

  const viewRecord: ViewerMetaData = {
    viewedAt: Timestamp.fromDate(new Date()),
    viewerId: userId,
    viewerFirstName: userData.basicInfo.firstName,
    viewerLastName: userData.basicInfo.lastName,
    viewerProfileImageURL: userData.basicInfo.profileImageUrl,
  };

  try {
    const userDocRef = db.collection("users").doc(visitedUserId);
    const userDocSnap = await userDocRef.get();

    if (!userDocSnap.exists) {
      throw new HttpsError("not-found", `User with ID ${visitedUserId} does not exist.`);
    }

    const profileViewsCollection = db.collection("users").doc(visitedUserId).collection("profileViews");
    await profileViewsCollection.add(viewRecord);
  } catch (error: unknown) {
    throw new HttpsError("internal", `${error}`);
  }
};

export const getContactDetails = async (contactId: string): Promise<Contact> => {
  const fullContactData: User = await fetchUserData(contactId);
  const contactFirstName = fullContactData.basicInfo.firstName;
  const contactLastName = fullContactData.basicInfo.lastName;
  const contactProfileImageURL = fullContactData.basicInfo.profileImageUrl;
  return {
    contactId: contactId,
    contactFirstName: contactFirstName,
    contactLastName: contactLastName,
    contactProfileImageURL: contactProfileImageURL,
  };
};

export const getUserTier = onCall(async (request) => {
  const userId = request.auth?.uid;
  if (!userId) throw new HttpsError("unauthenticated", "User must be logged in to access this function.");

  try {
    const userTier = await fetchUserTier(userId);
    return userTier;
  } catch (error: unknown) {
    throw new HttpsError("internal", `Failed to fetch user tier. ${error}`);
  }
});

export const getVisitedUserProfileData = onCall(async (request) => {
  const userId = request.auth?.uid;
  const visitedUserId = request.data.visitedUserId;

  if (!userId) throw new HttpsError("unauthenticated", "User must be logged in to access this function.");
  if (!visitedUserId) throw new HttpsError("invalid-argument", "Missing visitedUserId argument.");

  try {
    addProfileViewRecord(userId, visitedUserId).catch((error) => {
      console.log(error);
    }); // Fire and Forget.

    const userTier = await fetchUserTier(userId);
    if (userTier === "Pro") {
      return await getVisitedUserProfileDataPro(visitedUserId);
    } else {
      return await getVisitedUserProfileDataBasic(visitedUserId);
    }
  } catch (error: unknown) {
    throw new HttpsError("internal", `${error}`);
  }
});

export const getProfileViewCount = onCall(async (request) => {
  const userId = request.auth?.uid;

  if (!userId) throw new HttpsError("unauthenticated", "User must be logged in to access this function.");

  const userTier = await fetchUserTier(userId);
  const userProfileViewCountData = await db.collection("users").doc(userId).collection("profileViews").get();

  if (userTier === "Basic") {
    const last7DaysViewCount = getProfileViewCountWithinTimePeriod(userProfileViewCountData.docs, 7);
    return last7DaysViewCount;
  } else {
    const last24HoursViewCount = getProfileViewCountWithinTimePeriod(userProfileViewCountData.docs, 1);
    const last7DaysViewCount = getProfileViewCountWithinTimePeriod(userProfileViewCountData.docs, 7);
    const last30DaysViewCount = getProfileViewCountWithinTimePeriod(userProfileViewCountData.docs, 30);
    const last90DaysViewCount = getProfileViewCountWithinTimePeriod(userProfileViewCountData.docs, 90);
    return [last24HoursViewCount, last7DaysViewCount, last30DaysViewCount, last90DaysViewCount];
  }
});

export const getProfileViewData = onCall(async (request) => {
  const userId = request.auth?.uid;

  if (!userId) throw new HttpsError("unauthenticated", "User must be logged in to access this function.");
  const userTier = await fetchUserTier(userId);

  if (userTier === "Basic") throw new HttpsError("permission-denied", "This feature is only available for Pro users.");

  const userProfileViewCountData = await db.collection("users").doc(userId).collection("profileViews").get();
  return userProfileViewCountData.docs.map((document) => {
    return { id: document.id, ...document.data() };
  });
});

export const getUserContacts = onCall(async (request) => {
  const contactList: string[] = request.data.contactList;
  if (!contactList || contactList.length === 0)
    throw new HttpsError("invalid-argument", "One or more arguments are missing");

  const contactDetailsPromises = contactList.map((contact: string) => {
    return getContactDetails(contact);
  });

  const contactDetailsCollection: Contact[] = await Promise.all(contactDetailsPromises);
  return contactDetailsCollection;
});

export const getSuggestedProfiles = onCall(async (request) => {
  const userId = request.auth?.uid;
  if (!userId) throw new HttpsError("unauthenticated", "The user is unauthenticated.");

  const user = await fetchUserData(userId);
  const userContacts = user.basicInfo.contactList;
  const allUsersSnapshot = await db.collection("users").get();
  const allUsers = allUsersSnapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as User) }));

  return allUsers
    .filter((u) => u.basicInfo.email !== user.basicInfo.email)
    .filter((u) => !userContacts.includes(u.basicInfo.email))
    .map((u) => ({
      id: u.id,
      profileImageURL: u.basicInfo.profileImageUrl,
      firstName: u.basicInfo.firstName,
      lastName: u.basicInfo.lastName,
      tier: u.basicInfo.tier,
      headline: u.professionalInfo.headline,
      bio: u.professionalInfo.bio,
      roles: u.professionalInfo.roles,
      hasStartup: u.professionalInfo.hasStartup,
      wantsToCofound: u.professionalInfo.wantsToCofound,
      startupDescription: u.professionalInfo.startupDescription,
      score: compatibilityScore(user, u as User),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
});
