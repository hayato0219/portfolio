export interface SiteProps {
  name: string;
  title: string;
  socials: {
    email: string;
    gitHub: string;
  };
}

export interface Translations {
  home: string;
  about: string;
  contact: string;
  aboutMe: string;
  skillSet: string;
  portfolio?: string;
  skillsTitle?: string;
  experience: string;
  tools: string;
  technologiesLabel: string;
  achievementsLabel: string;
  aboutDescription: string;
  greetingHi?: string;
  greetingName?: string;
  greeting?: string;
  skills: string[];
  experienceList: Array<{
    year: string;
    items: Array<{
      title: string;
      description: string;
      date?: string;
      technologies?: string;
      tags?: string;
      images?: string[];
    }>;
  }>;
  toolsList: string[];
  projectsList?: Array<{
    title: string;
    description: string;
  }>;
  chatbotTitle: string;
  chatbotWelcome: string;
  chatbotPlaceholder: string;
  chatbotSend: string;
  contactTitle: string;
  email: string;
  github: string;
  createdBy: string;
  creatorName: string;
  switchToJapanese: string;
  switchToEnglish: string;
}

export interface TranslationsObject {
  en: Translations;
  ja: Translations;
}
