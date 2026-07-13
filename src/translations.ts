import type { TranslationsObject } from './types';

export const translations: TranslationsObject = {
  en: {
    // Header
    home: "Home",
    about: "About",
    contact: "Contact",

    // Home/Intro
    greeting: "Hi there!\nI'm Hayato Seki!",
    heroTagline: "Informatics grad student at Osaka Metropolitan University. I like building web apps.",

    // Sections
    aboutMe: "About Me",
    skillSet: "Skill Set",
    experience: "Projects",
    tools: "Tools",
    technologiesLabel: "Technologies",
    achievementsLabel: "Achievements",
    linkDemo: "Demo",
    linkRepo: "Code",
    linkPaper: "Paper",
    linkOpen: "Link",

    // Footer
    contactTitle: "Contact",
    email: "Email",
    github: "GitHub",
    createdBy: "Created by",
    creatorName: "Hayato Seki",
    backToTop: "Back to top",

    // Language toggle
    switchToJapanese: "Japanese",
    switchToEnglish: "English",

    // About content
    aboutDescription: "I'm a graduate student in Informatics at Osaka Metropolitan University. These days I build web apps, making good use of AI along the way. I enjoy trying out new technologies and turning ideas into things that actually work. Outside of coding, I like variety shows (mainly Chidori's programs), anime, manga, and working out.",

    // Skills
    skills: [
      "Next.js",
      "TypeScript",
      "Python",
      "Angular",
      "NestJS",
      "MongoDB",
      "Firebase",
      "Vercel",
    ],

    // Experience/Services
    experienceList: [
      {
        year: "2025",
        items: [
          {
            title: "Current Research",
            description: "Developing an image generation & pronunciation evaluation & English vocabulary learning app",
            date: "Development Period: 2025/04 -",
            technologies: ["Next.js(TypeScript)", "shadcn/ui", "vercel", "MongoDB", "Firebase (Storage)", "OpenAI API (DALL-E3)", "Azure Speech Services API (Pronunciation Assessment)"],
            images: ["currentResearch.png", "currentResearch-ImageGeneration.mp4", "currentResearch-ImageEdit.mp4","currentResearch-PronunciationAssessment.mp4"]
          }
        ]
      },
      {
        year: "2024",
        items: [
          {
            title: "Graduation Thesis Research",
            description: "Estimated the speech bubbles containing words readers did not understand, from their audio and eye-tracking data while reading English manga aloud. Presented at ABC2025 (a peer-reviewed international conference), with experiments conducted in France.",
            date: "Research Period: 2024/4 - 2025/3",
            technologies: ["Python", "SVM", "Eye Tracking", "Speech Processing"],
            links: [{ type: "paper", url: "https://ieeexplore.ieee.org/document/11118482" }],
            images: ["pastResearch.jpeg"]
          },
        ]
      }
    ],

    // Tools list
    toolsList: [
      "Git & GitHub",
      "Visual Studio Code"
    ],

    // Chatbot
    chatbotTitle: "Ask me anything",
    chatbotPlaceholder: "Ask about my skills, experience, or projects...",
    chatbotSend: "Send",
    chatbotWelcome: "Hi! Feel free to ask me about my experience, skills, or projects.",
    chatbotSuggestions: [
      "What are your skills?",
      "Tell me about your research",
      "What have you built recently?",
      "What are your hobbies?",
    ],
    chatbotReset: "Reset conversation",
  },
  ja: {
    // Header
    home: "ホーム",
    about: "自己紹介",
    contact: "連絡先",

    // Home/Intro
    greeting: "こんにちは！\n関勇人（せきはやと）です！",
    heroTagline: "情報学専攻の大学院生です。\n研究やアルバイトでWebアプリを作っています。",

    // Sections
    aboutMe: "自己紹介",
    skillSet: "スキルセット",
    experience: "プロジェクト",
    tools: "ツール",
    technologiesLabel: "使用技術",
    achievementsLabel: "成果・特記事項",
    linkDemo: "デモ",
    linkRepo: "コード",
    linkPaper: "論文",
    linkOpen: "リンク",

    // Footer
    contactTitle: "連絡先",
    email: "メール",
    github: "GitHub",
    createdBy: "作成者",
    creatorName: "関勇人",
    backToTop: "トップへ戻る",

    // Language toggle
    switchToJapanese: "日本語",
    switchToEnglish: "英語",

    // About content
    aboutDescription: "大阪公立大学で情報学を専攻している大学院生です。普段はAIも活用しながらWebアプリを作っています。新しい技術を触って、実際に動くものを形にするのが好きです。コーディング以外では、バラエティ番組（主に千鳥の番組）やアニメ、漫画を見たり、筋トレをするのが好きです。",

    // Skills
    skills: [
      "Next.js",
      "TypeScript",
      "Python",
      "Angular",
      "NestJS",
      "MongoDB",
      "Firebase",
      "Vercel",
    ],

    // Experience/Services
    experienceList: [
      {
        year: "2025",
        items: [
          {
            title: "現在の研究",
            description: "画像生成&発音評価&英単語学習アプリを開発中です",
            date: "開発期間: 2025/04 -",
            technologies: ["Next.js(TypeScript)", "shadcn/ui", "vercel", "MongoDB", "Firebase (Storage)", "OpenAI API (DALL-E3)", "Azure Speech Services API (Pronunciation Assessment)"],
            images: ["currentResearch.png", "currentResearch-ImageGeneration.mp4", "currentResearch-ImageEdit.mp4", "currentResearch-PronunciationAssessment.mp4"]
          }
        ]
      },
      {
        year: "2024",
        items: [
          {
            title: "卒業論文の研究",
            description: "英語漫画を音読してもらい、その音声と視線情報から、音読者が意味の分からない単語を含む吹き出しを推定しました。ABC2025（査読ありの国際学会）で口頭発表し、実験はフランスで実施しました。",
            date: "研究期間: 2024/4 - 2025/3",
            technologies: ["Python", "SVM", "アイトラッキング", "音声処理"],
            links: [{ type: "paper", url: "https://ieeexplore.ieee.org/document/11118482" }],
            images: ["pastResearch.jpeg"]
          },
        ]
      }
    ],

    // Tools list
    toolsList: [
      "Git & GitHub",
      "Visual Studio Code"
    ],

    // Chatbot
    chatbotTitle: "何でも聞いてください",
    chatbotPlaceholder: "スキル、経験、プロジェクトについて質問してください...",
    chatbotSend: "送信",
    chatbotWelcome: "こんにちは！私の経験やスキル、プロジェクトについて何でもお聞きください。",
    chatbotSuggestions: [
      "スキルは何ですか？",
      "研究について教えて",
      "最近作ったものは？",
      "趣味は何ですか？",
    ],
    chatbotReset: "会話をリセット",
  }
};
