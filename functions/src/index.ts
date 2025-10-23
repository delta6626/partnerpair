import * as admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
import { UserTier } from "./shared/types/UserTier";

admin.initializeApp();

const db = getFirestore();

// shared internal function

const fetchUserTier = async (userId: string): Promise<UserTier> => {
  const userDoc = await db.collection("users").doc(userId).get();
  const userTier = userDoc.data()?.basicInfo.tier;
  return userTier as UserTier;
};

export const getUserTier = onCall(async (request): Promise<UserTier> => {
  const userId = request.auth?.uid;

  if (!userId) throw new HttpsError("unauthenticated", "User must be logged in to access this function.");

  try {
    const userTier = await fetchUserTier(userId);
    return userTier;
  } catch (error: unknown) {
    throw new HttpsError("internal", "Failed to fetch user tier.");
  }
});
