import type { SocialProfile } from "../types/SocialProfile";

export const isValidProfileLink = (type: SocialProfile, profileLink: string) => {
  const patterns: Record<SocialProfile, RegExp> = {
    linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
    twitter: /^https:\/\/github\.com\/[A-Za-z0-9_-]+\/?$/,
    github: /^https:\/\/x\.com\/[A-Za-z0-9_-]+\/?$/,
    website: /^https:\/\/[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+([\/?#].*)?$/, // Any valid domain
  };
  const pattern: RegExp = patterns[type];

  if (profileLink === "") return true;
  return pattern.test(profileLink.trim());
};
