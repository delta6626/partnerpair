import { SETTINGS } from "../constants/SETTINGS";
import type { UserTier } from "../types/UserTier";

// A stub that mimicks an API call to fetch a user from the server.

export const getProfileData = (currentUserSubscriptionStatus: UserTier) => {
  const user1 = {
    basicInfo: {
      firstName: "Alice",
      lastName: "Nguyen",
      dateOfBirth: "1993-04-15",
      phone: "+1-555-238-9456",
      location: "San Francisco, CA",
      verified: true,
      tier: "Pro",
      profileImageUrl: SETTINGS.PROFILE_PHOTOS.PROFILE_PHOTO_16,
      connectedToCurrentUser: true,
      createdAt: "11-10-25",
      lastActiveAt: "2 hours ago",
    },

    professionalInfo: {
      headline: "AI Engineer & Startup Founder",
      bio: "Passionate about building AI products that empower small businesses. Looking for a co-founder with strong marketing and business skills.",
      skills: ["Python", "TensorFlow", "NLP", "Product Design"],
      roles: ["Technical Co-founder", "CTO"],
      commitmentLevel: "20-30 hours per week",
      availability: "Available immediately",
      hasStartup: true,
      hasStartupIdea: true,
      startupDescription: "An AI-driven SaaS platform that helps SMEs automate content generation.",
      startupStage: "MVP",
      wantsToCofound: false,
    },

    matchingPreferences: {
      lookingForSkills: ["Growth Marketing", "Fundraising", "Business Strategy"],
      lookingForRoles: ["CEO", "COO"],
      commitmentLevel: "10-20 hours per week",
      availability: "Available immediately",
      preferredCompanyStage: [],
    },

    socialLinks: {
      linkedin: "https://linkedin.com/in/alicenguyen",
      twitter: "https://twitter.com/alice_ai",
      github: "https://github.com/alicenguyen",
      website: "https://alicenguyen.ai",
    },
  };

  const user2 = {
    basicInfo: {
      firstName: "Marcus",
      lastName: "Lee",
      dateOfBirth: "1989-11-02",
      location: "New York, NY",
      verified: true,
      tier: "Basic",
      profileImageUrl: SETTINGS.PROFILE_PHOTOS.PROFILE_PHOTO_7,
      connectedToCurrentUser: false,
      createdAt: new Date("2024-03-12"),
    },

    professionalInfo: {
      headline: "Product Manager & Business Strategist",
      bio: "Driven by data and design. I specialize in turning early-stage ideas into scalable products. Seeking a technical partner with strong AI and automation expertise.",
      skills: ["Product Management", "Market Research", "Agile", "Business Development"],
      roles: ["CEO", "COO"],
      commitmentLevel: "60-70 hours per week",
      availability: "Available in 1 month",
      hasStartup: false,
      hasStartupIdea: false,
      startupDescription: "",
      startupStage: "",
      wantsToCofound: true,
    },

    matchingPreferences: {
      lookingForSkills: ["Machine Learning", "Backend Development", "UI/UX Design"],
      lookingForRoles: ["CTO", "Technical Co-founder"],
      commitmentLevel: "50-40 hours per week",
      availability: "Available immediately",
      preferredCompanyStage: ["Idea", "MVP"],
    },
  };

  if (currentUserSubscriptionStatus === "Pro") {
    return user1;
  } else {
    return user2;
  }
};
