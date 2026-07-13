export interface SiteProps {
  name: string;
  title: string;
  socials: {
    email: string;
    gitHub: string;
  };
}

export type ProjectLinkType = 'demo' | 'repo' | 'paper' | 'link';

export interface ProjectLink {
  type: ProjectLinkType;
  url: string;
}

export interface ExperienceItem {
  title: string;
  description: string;
  date?: string;
  technologies?: string[];
  tags?: string;
  images?: string[];
  links?: ProjectLink[];
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
  linkDemo?: string;
  linkRepo?: string;
  linkPaper?: string;
  linkOpen?: string;

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
  chatbotSuggestions?: string[];
  chatbotReset?: string;

  // Footer
  contactTitle: string;
  email: string;
  github: string;
  createdBy: string;
  creatorName: string;
  backToTop?: string;

  // Language toggle
  switchToJapanese: string;
  switchToEnglish: string;
}

export interface TranslationsObject {
  en: Translations;
  ja: Translations;
}
