export interface SiteProps {
  name: string;
  title: string;
  socials: {
    email: string;
    gitHub: string;
  };
}

export interface ExperienceItem {
  title: string;
  description: string;
  date?: string;
  technologies?: string[];
  tags?: string;
  images?: string[];
}

export interface YearData {
  year: string;
  items: ExperienceItem[];
}

export interface Translations {
  // Header
  home: string;
  about: string;
  contact: string;

  // Home / intro
  greeting: string;
  heroTagline?: string;

  // Sections
  aboutMe: string;
  skillSet: string;
  experience: string;
  tools: string;
  technologiesLabel: string;
  achievementsLabel: string;

  // Content
  aboutDescription: string;
  skills: string[];
  experienceList: YearData[];
  toolsList: string[];

  // Chatbot
  chatbotTitle: string;
  chatbotWelcome: string;
  chatbotPlaceholder: string;
  chatbotSend: string;

  // Footer
  contactTitle: string;
  email: string;
  github: string;
  createdBy: string;
  creatorName: string;

  // Language toggle
  switchToJapanese: string;
  switchToEnglish: string;
}

export interface TranslationsObject {
  en: Translations;
  ja: Translations;
}
