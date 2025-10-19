import type { AuthMethod } from "./AuthMethod";
import type { UserAvailability } from "./UserAvailability";
import type { UserCommitmentLevel } from "./UserCommitmentLevel";
import type { UserEducation } from "./UserEducation";
import type { UserPreferredCompanyStage } from "./UserPreferredCompanyStage";
import type { UserRole } from "./UserRole";
import type { UserTier } from "./UserTier";

export interface User {
  basicInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    location: string;
    verified: boolean;
    tier: UserTier;
    authenticationMethod: AuthMethod;
    profileImageUrl: string;
    profileCompleted: boolean;
    profileViews: number;
    createdAt: Date;
    lastActiveAt: Date;
  };

  professionalInfo: {
    headline: string;
    bio: string; // Description of why the user would make a good co-founder.
    skills: string[];
    roles: UserRole[];
    commitmentLevel: UserCommitmentLevel;
    availability: UserAvailability;
    education: UserEducation[];
    hasStartup: boolean | null;
    startupDescription: string;
    startupStage: UserPreferredCompanyStage;
    wantsToCofound: boolean | null;
  };

  matchingPreferences: {
    lookingForSkills: string[];
    lookingForRoles: UserRole[];
    commitmentLevel: UserCommitmentLevel;
    availability: UserAvailability;
    preferredCompanyStage: UserPreferredCompanyStage[];
  };

  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
    website: string;
  };
}
