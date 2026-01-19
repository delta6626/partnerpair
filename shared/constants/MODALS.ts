export const MODALS = {
  ADD_SKILL_MODAL: {
    ID_CURRENT: "addSkillModalCurrent",
    ID_MATCHING: "addSkillModalMatching",
    TITLE: "Add new skill",
    DESCRIPTION_CURRENT: "Enhance your profile by adding a new skill.",
    DESCRIPTION_MATCHING: "List skills you want in a cofounder",
    PLACEHOLDER: "Enter a skill",
    SKILL_MAX_LENGTH: 50,
    NO_VALUE_ERROR: "Please enter a skill.",
    SKILL_EXISTS_ERROR: "You have already added this skill before.",
  },

  PROFILE_UPDATE_SUCCESS_MODAL: {
    ID: "profileUpdateSuccessModal",
    TITLE: "Profile Updated",
    DESCRIPTION: "Your profile changes have been saved successfully.",
  },

  SUGGESTED_PROFILES_INFORMATION_MODAL: {
    ID: "suggestedProfilesInformationModal",
    TITLE: "Suggested Profiles",
    DESCRIPTION:
      "Suggested profiles are users who best match your skills, roles, availability, and commitment preferences. Complete your profile to get more accurate matches.",
  },

  PROFILE_UPDATE_ERROR_MODAL: {
    ID: "profileUpdateErrorModal",
    TITLE: "Update Failed",
    DESCRIPTION: "Your profile changes could not be saved. Please try again.",
  },

  CHAT_DELETE_ERROR_MODAL: {
    ID: "chatDeleteErrorModal",
    TITLE: "Failed to Delete Chat",
    DESCRIPTION: "This chat could not be deleted at the moment. Please try again later.",
  },

  FAILED_MESSAGE_ERROR_MODAL: {
    ID: "failedMessageErrorModal",
    TITLE: "Failed to Send Message",
    DESCRIPTION: "This message could not be sent at the moment. Please try again.",
  },

  CONTACT_ADDITION_FAILED_ERROR_MODAL: {
    ID: "contactAdditionFailedErrorModal",
    TITLE: "Failed to Add Contact",
    DESCRIPTION: "The contact could not be added at this time. Please try again later.",
  },

  CONTACT_DELETION_FAILED_ERROR_MODAL: {
    ID: "contactDeletionFailedErrorModal",
    TITLE: "Failed to Remove Contact",
    DESCRIPTION: "The contact could not be removed at this time. Please try again later.",
  },

  PHOTO_UPLOAD_FAILED_ERROR_MODAL: {
    ID: "photoUploadFailedErrorModal",
    TITLE: "Failed to Upload Photo",
    DESCRIPTION: "The photo could not be uploaded at this time. Please try again.",
  },

  PHOTO_UPLOAD_FAILED_FILE_SIZE_ERROR_MODAL: {
    ID: "photoUploadFailedFileSizeErrorModal",
    TITLE: "Failed to Upload Photo",
    DESCRIPTION: "This photo exceeds the maximum allowed file size. Please choose a smaller file and try again.",
  },

  PHOTO_UPLOAD_FAILED_UNSUPPORTED_TYPE_ERROR_MODAL: {
    ID: "photoUploadFailedUnsupportedTypeErrorModal",
    TITLE: "Failed to Upload Photo",
    DESCRIPTION: "This file type is not supported. Please upload a photo in a supported format and try again.",
  },

  REPORT_MESSAGE_MODAL: {
    ID: "reportMessageModal",
    TITLE: "Report Message",
    SUBTITLE: "Select a reason",
    REASONS: [
      "Harassment or bullying",
      "Hate speech or threats",
      "Spam or scam",
      "Sexual or explicit content",
      "Other",
    ],
  },
};
