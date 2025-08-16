// Utility function for handling Firebase errors
export const handleFirebaseError = (error: any): Error => {
  switch (error.code) {
    case "auth/invalid-email":
      return new Error("Please enter a valid email address.");
    case "auth/weak-password":
      return new Error("Password should be at least 6 characters long.");
    case "auth/email-already-in-use":
      return new Error(
        "This email address is already associated with an account."
      );
    case "auth/too-many-requests":
      return new Error("Too many attempts. Please try again later.");

    case "auth/network-request-failed":
      return new Error("Network error. Please check your internet connection.");
    case "auth/account-exists-with-different-credential":
      return new Error(
        "An account already exists with this email using a different sign-in method."
      );
    case "auth/popup-blocked":
      return new Error(
        "Your browser blocked the sign-in popup. Please allow popups and try again."
      );
    case "auth/popup-closed-by-user":
      return new Error(
        "Sign-in popup was closed before completing the sign-in."
      );
    case "auth/unauthorized-domain":
      return new Error(
        "This app is not authorized for Google sign-in. Contact support."
      );
    default:
      console.error("Unexpected error:", error);
      return new Error("An unexpected error occurred. Please try again later.");
  }
};
