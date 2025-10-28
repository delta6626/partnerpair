import * as admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import { UserTier } from "./shared/types/UserTier";
import { User } from "./shared/types/User";
import { DisplayableUserPro } from "./shared/types/DisplayableUserPro";
import { DisplayableUserBasic } from "./shared/types/DisplayableUserBasic";
import { ViewerMetaData } from "./shared/types/ViewerMetaData";

admin.initializeApp();

const db = getFirestore();

// shared internal functions

const fetchUserTier = async (userId: string): Promise<UserTier> => {
  const userDoc = await db.collection("users").doc(userId).get();
  const userTier = userDoc.data()?.basicInfo.tier;
  return userTier as UserTier;
};

const getVisitedUserProfileDataPro = async (userId: string, visitedUserId: string) => {
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

const getVisitedUserProfileDataBasic = async (userId: string, visitedUserId: string) => {
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

  const viewRecord: ViewerMetaData = {
    viewedAt: new Date(),
    viewerId: userId,
  };

  try {
    const profileViewsCollection = db.collection("users").doc(visitedUserId).collection("profileViews");
    await profileViewsCollection.add(viewRecord);
  } catch (error: unknown) {
    throw new HttpsError("internal", `${error}`);
  }
};

export const getVisitedUserProfileData = onCall(async (request) => {
  const userId = request.auth?.uid;
  const visitedUserId = request.data.visitedUserId;

  if (!userId) throw new HttpsError("unauthenticated", "User must be logged in to access this function.");
  if (!visitedUserId) throw new HttpsError("invalid-argument", "Missing visitedUserId argument.");

  try {
    const userTier = await fetchUserTier(userId);
    if (userTier === "Pro") {
      return await getVisitedUserProfileDataPro(userId, visitedUserId);
    } else {
      return await getVisitedUserProfileDataBasic(userId, visitedUserId);
    }
  } catch (error: unknown) {
    throw new HttpsError("internal", `${error}`);
  }
});
