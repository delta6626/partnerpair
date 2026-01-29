import { SETTINGS } from "./SETTINGS";

export const HOME = {
  BASIC_FEATURES: [
    "Create your profile",
    "Search and browse co-founders",
    "Limited search filters",
    "Limited access to other profiles",
    `Start up to ${SETTINGS.BASIC_MAX_CHATS} chats`,
    `Save up to ${SETTINGS.BASIC_MAX_CONTACTS} contacts`,
  ],
  PRO_FEATURES: [
    "Create your profile",
    "Search and browse co-founders",
    "Full access to all search filters",
    "Full access to other profiles",
    "See who viewed your profile",
    "Unlimited chats",
    "Unlimited saved contacts",
    "Priority support",
  ],
  PRO_PRICE: "4.99",
  FAQ: [
    {
      question: "What is this platform for?",
      answer:
        "Our platform helps you find and connect with potential co-founders using intelligent matching, advanced search, and professional profiles.",
    },
    {
      question: "How does the co-founder matching work?",
      answer:
        "Our algorithm uses compatibility scoring based on your skills, roles, and preferences to suggest complementary co-founders automatically on your dashboard.",
    },
    {
      question: "Can I search for co-founders based on location or skills?",
      answer:
        "Yes! You can filter search results by skills, roles, commitment level, availability, startup stage, and location to find the most suitable matches.",
    },
    {
      question: "Can I message potential co-founders directly?",
      answer: "Yes! There’s zero friction — just start a chat and connect instantly.",
    },
    {
      question: "How can I track who viewed my profile?",
      answer:
        "You can see how many people viewed your profile, filter by time periods, distinguish unique vs. repeat views, if you upgrade to Pro.",
    },
    {
      question: "Is there a way to save potential co-founders for later?",
      answer:
        "Absolutely! You can favorite profiles, organize contacts, search saved contacts, and quickly navigate to them from your dashboard.",
    },
    {
      question: "How is user safety handled on the platform?",
      answer:
        "We have abuse reporting, active moderation, and email verification to maintain a safe and professional environment.",
    },
    {
      question: "What features are included in the Basic membership?",
      answer: `Basic membership includes creating your profile, searching and browsing co-founders, limited search filters and profile access, starting up to ${SETTINGS.BASIC_MAX_CHATS} chats, and saving up to ${SETTINGS.BASIC_MAX_CONTACTS} contacts.`,
    },
    {
      question: "What additional benefits come with the Pro membership?",
      answer:
        "Pro membership provides full access to all search filters and profiles, unlimited chats and saved contacts, profile view insights, and priority support.",
    },
    {
      question: "Can I participate in community forums or read industry blogs?",
      answer:
        "Community forums and industry blogs are planned for the future. Once implemented, you’ll be able to network, share resources, and access expert content.",
    },
    {
      question: "How do I start using the platform as a new user?",
      answer:
        "Sign up for an account, complete your profile, browse suggested co-founders or use the search, and start connecting via messaging.",
    },
  ],
};
