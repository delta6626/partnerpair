import { onCall, HttpsError } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

export const getUserTier = onCall(async (request) => {
  const userId = request.auth?.uid;

  if (!userId) {
    throw new HttpsError("unauthenticated", "User must be logged in to access this function.");
  }

  try {
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      throw new HttpsError("not-found", "User record not found.");
    }

    const userData = userDoc.data();
    const userTier = userData?.tier || "free";

    return { tier: userTier };
  } catch (error: any) {
    console.error("Error fetching user tier:", error);
    throw new HttpsError("internal", "Failed to fetch user tier.");
  }
});
