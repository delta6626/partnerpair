import { onCall } from "firebase-functions/v2/https";
import { UserTier } from "../../shared/types/UserTier";

export const getUserTier = onCall((request) => {
  const userId: string | undefined = request.auth?.uid;
});
