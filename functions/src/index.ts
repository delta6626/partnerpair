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
import { SearchParams } from "./shared/types/SearchParams";
import { BROWSE } from "./shared/constants/BROWSE";
import { countries } from "./shared/utils/countries";
import { checkSearchParamsValid } from "./shared/utils/checkSearchParamsValid";
import { FilteredUsersPayload } from "./shared/types/FilteredUsersPayload";
import { FilteredUser } from "./shared/types/FilteredProfile";
import { ChatExistenceInformation } from "./shared/types/ChatExistenceInformtion";
import { ChatMetaData } from "./shared/types/ChatMetaData";

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
  let suggestionCount = request.data.suggestionCount || 20;

  if (!userId) throw new HttpsError("unauthenticated", "The user is unauthenticated.");
  if (suggestionCount > 50) suggestionCount = 50; // max limit

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
    .slice(0, suggestionCount);
});

export const getFilteredUsers = onCall(async (request) => {
  const userId = request.auth?.uid;
  const rawSearchParams = request.data.searchParams;
  const cursor = request.data.cursor || 0;
  const pageLimit = 20; // Max profiles per page / per request

  const searchParamsValid = checkSearchParamsValid(rawSearchParams);

  if (!searchParamsValid) throw new HttpsError("invalid-argument", "Search parameters are invalid.");
  if (!userId) throw new HttpsError("unauthenticated", "The user is unauthenticated.");

  const searchParams = request.data.searchParams as SearchParams;
  const userTier = await fetchUserTier(userId);

  if (
    (searchParams.location != "" ||
      searchParams.commitmentLevels.length != 0 ||
      searchParams.availabilities.length != 0 ||
      searchParams.commitmentLevelsSought.length != 0 ||
      searchParams.availabilitiesSought.length != 0) &&
    userTier === "Basic"
  )
    throw new HttpsError("permission-denied", "Pro features cannot be accessed by Basic tier user.");

  const allUsersSnapshot = await db.collection("users").get();
  const allUsers = allUsersSnapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as User) }));

  const allFilteredUsers = allUsers.filter((user) => {
    if (user.id === userId) return false;

    if (searchParams.profileType === "startupOwner" && !user.professionalInfo.hasStartup) return false;

    if (searchParams.profileType === "startupSeeker" && user.professionalInfo.hasStartup) return false;

    if (
      searchParams.profileType === "startupOwner" &&
      searchParams.preferredStartupStages.length &&
      !searchParams.preferredStartupStages.includes(user.professionalInfo.startupStage)
    )
      return false;

    if (searchParams.name.trim()) {
      const fullName = `${user.basicInfo.firstName} ${user.basicInfo.lastName}`.toLowerCase();
      const search = searchParams.name.trim().toLowerCase();
      if (!fullName.includes(search)) return false;
    }

    if (
      searchParams.location != "" &&
      searchParams.location != BROWSE.PARAM_VALUE_ANY_COUNTRY &&
      countries[searchParams.location] &&
      countries[searchParams.location] != user.basicInfo.location
    )
      return false;

    if (
      searchParams.skills.length &&
      !user.professionalInfo.skills.some((skill) => searchParams.skills.includes(skill))
    )
      return false;

    if (searchParams.roles.length && !user.professionalInfo.roles.some((role) => searchParams.roles.includes(role)))
      return false;

    if (
      searchParams.commitmentLevels.length &&
      user.professionalInfo.commitmentLevel &&
      !searchParams.commitmentLevels.includes(user.professionalInfo.commitmentLevel)
    )
      return false;

    if (
      searchParams.availabilities.length &&
      user.professionalInfo.availability &&
      !searchParams.availabilities.includes(user.professionalInfo.availability)
    )
      return false;

    if (
      searchParams.skillsSought.length &&
      !user.matchingPreferences.lookingForSkills.some((skill) => searchParams.skillsSought.includes(skill))
    )
      return false;

    if (
      searchParams.rolesSought.length &&
      !user.matchingPreferences.lookingForRoles.some((role) => searchParams.rolesSought.includes(role))
    )
      return false;

    if (
      searchParams.commitmentLevelsSought.length &&
      !searchParams.commitmentLevelsSought.includes(user.matchingPreferences.commitmentLevel)
    )
      return false;

    if (
      searchParams.availabilitiesSought.length &&
      !searchParams.availabilitiesSought.includes(user.matchingPreferences.availability)
    )
      return false;

    return true;
  });

  allFilteredUsers.sort((userA, userB) => userA.id.localeCompare(userB.id));
  const paginatedUsers = allFilteredUsers.slice(cursor, cursor + pageLimit);

  const filteredPaginatedUsers: FilteredUser[] = paginatedUsers.map((user) => ({
    id: user.id,
    profileImageURL: user.basicInfo.profileImageUrl,
    firstName: user.basicInfo.firstName,
    lastName: user.basicInfo.lastName,
    tier: user.basicInfo.tier,
    headline: user.professionalInfo.headline,
    bio: user.professionalInfo.bio,
    roles: user.professionalInfo.roles,
    hasStartup: user.professionalInfo.hasStartup,
    wantsToCofound: user.professionalInfo.wantsToCofound,
    startupDescription: user.professionalInfo.startupDescription,
  }));

  return {
    users: filteredPaginatedUsers,
    currentCursor: cursor,
    nextCursor: cursor + pageLimit < allFilteredUsers.length ? cursor + pageLimit : null,
  } as FilteredUsersPayload;
});

// Messaging

const checkChatExists = async (userA: string, userB: string) => {
  const chatsRef = db.collection("chats");
  const querySnapshot = await chatsRef.where("participants", "array-contains", userA).get();

  for (const doc of querySnapshot.docs) {
    const data = doc.data() as Omit<ChatMetaData, "id">;
    if (data.participants.includes(userB)) {
      return {
        chatExists: true,
        chatId: doc.id,
      } as ChatExistenceInformation;
    }
  }

  // If no chat was found
  return {
    chatExists: false,
    chatId: null,
  } as ChatExistenceInformation;
};

export const initiateChat = onCall(async (request) => {
  const userId = request.auth?.uid;
  const chatInitiatorId = request.data.chatInitiator ?? "";
  const otherParticipantId = request.data.otherParticipantId ?? "";

  if (!userId) throw new HttpsError("unauthenticated", "User is not authenticated.");
  if (!chatInitiatorId || otherParticipantId)
    throw new HttpsError("invalid-argument", "One or more arguments are missing.");
});
