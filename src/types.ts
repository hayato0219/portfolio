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

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Translations {
  // Header / nav
  about: string;
  projects: string;
  skills: string;
  contact: string;

  // Hero
  heroTitle: string;
  heroAffiliation: string;
  heroCta: string;

  // Section titles & labels
  aboutMe: string;
  technologiesLabel: string;
  achievementsLabel: string;
  enlargeMedia: string;
  linkDemo?: string;
  linkRepo?: string;
  linkPaper?: string;
  linkOpen?: string;

  // Content
  aboutDescription: string;
  skillGroups: SkillGroup[];
  experienceList: YearData[];

  // Chatbot
  chatbotLauncher: string;
  chatbotTitle: string;
  chatbotWelcome: string;
  chatbotPlaceholder: string;
  chatbotSend: string;
  chatbotClose: string;
  chatbotSuggestions?: string[];
  chatbotReset?: string;

  // Contact / footer
  contactTitle: string;
  contactLead: string;
  backToTop?: string;
  skipToContent: string;

  // Hero prompt
  askLabel: string;
  askContinue: string;
  askClear: string;

  // Project media scrubbing
  scrubHintHover: string;
  scrubHintTouch: string;

  // Header status (edit statusNow to whatever you're up to)
  statusCity: string;
  statusNow: string;

  // Chat errors
  chatErrorUnavailable: string;
  chatErrorBusy: string;
  chatErrorGeneric: string;
  chatErrorNetwork: string;
}

export interface TranslationsObject {
  en: Translations;
  ja: Translations;
}
