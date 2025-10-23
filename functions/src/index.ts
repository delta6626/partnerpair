import * as admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import { UserTier } from "./shared/types/UserTier";
import { User } from "./shared/types/User";

admin.initializeApp();

const db = getFirestore();

// shared internal functions

const fetchUserTier = async (userId: string): Promise<UserTier> => {
  const userDoc = await db.collection("users").doc(userId).get();
  const userTier = userDoc.data()?.basicInfo.tier;
  return userTier as UserTier;
};

const getVisitedUserProfileDataPro = async (visitedUserId: string) => {
  const visitedUserDoc = await db.collection("users").doc(visitedUserId).get();
  if (!visitedUserDoc.exists) throw new HttpsError("not-found", "This user does not exist.");

  const visitedUserData = visitedUserDoc.data() as User;
};

const getVisitedUserProfileDataBasic = async (visitedUserId: string) => {};

export const getVisitedUserProfileData = onCall(async (request) => {
  const userId = request.auth?.uid;
  const visitedUserId = request.data.visitedUserId;

  if (!userId) throw new HttpsError("unauthenticated", "User must be logged in to access this function.");
  if (!visitedUserId) throw new HttpsError("invalid-argument", "Missing visitedUserId argument.");

  try {
    const userTier = await fetchUserTier(userId);
    if (userTier === "Pro") {
      return await getVisitedUserProfileDataPro(visitedUserId);
    } else {
      return await getVisitedUserProfileDataBasic(visitedUserId);
    }
  } catch (error: unknown) {
    throw new HttpsError("internal", "Failed to fetch user tier.");
  }
});
