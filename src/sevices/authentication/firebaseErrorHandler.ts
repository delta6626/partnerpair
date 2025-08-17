import { SIGNUP } from "../../constants/SIGNUP";

// Utility function for handling Firebase errors
export const handleFirebaseError = (error: any): string => {
  switch (error.code) {
    case "auth/invalid-email":
      return SIGNUP.EMAIL_INVALID_ERROR;
    case "auth/weak-password":
      return SIGNUP.PASSWORD_LENGTH_ERROR;
    case "auth/email-already-in-use":
      return SIGNUP.EMAIL_ALREADY_IN_USE;
    case "auth/too-many-requests":
      return SIGNUP.TOO_MANY_ATTEMPTS;
    case "auth/network-request-failed":
      return SIGNUP.NETWORK_ERROR;
    case "auth/account-exists-with-different-credential":
      return SIGNUP.ACCOUNT_EXISTS_WITH_DIFFERENT_SIGNIN_METHOD;
    case "auth/popup-blocked":
      return SIGNUP.POPUP_BLOCKED;
    case "auth/popup-closed-by-user":
      return SIGNUP.POPUP_CLOSED;
    case "auth/unauthorized-domain":
      return SIGNUP.UNAUTHORIZED_DOMAIN;
    default:
      console.error("Unexpected error:", error);
      return SIGNUP.UNKNOWN_ERROR;
  }
};
