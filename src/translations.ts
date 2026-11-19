import type { TranslationsObject } from './types';

export const translations: TranslationsObject = {
  en: {
    // Header / nav
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",

    // Hero
    heroTitle: "A graduate student in Informatics, building web apps for research and part-time work.",
    heroAffiliation: "Osaka Metropolitan University · Informatics",
    heroCta: "Get in touch",

    // Section titles & labels
    aboutMe: "About",
    technologiesLabel: "Stack",
    achievementsLabel: "Highlights",
    enlargeMedia: "View larger",
    linkDemo: "Demo",
    linkRepo: "Code",
    linkPaper: "Paper",
    linkOpen: "Link",

    // Contact / footer
    contactTitle: "Contact",
    contactLead: "Feel free to reach out — about work, research, or anything else.",
    backToTop: "Back to top",
    skipToContent: "Skip to content",

    // About content
    aboutDescription: "I'm a graduate student in Informatics at Osaka Metropolitan University. These days I build web apps, making good use of AI along the way. I enjoy trying out new technologies and turning ideas into things that actually work. Outside of coding, I like variety shows (mainly Chidori's programs), anime, manga, and working out.",

    // Skills
    skillGroups: [
      { title: "Frontend", items: ["Next.js", "TypeScript", "Angular"] },
      { title: "Backend / Data", items: ["NestJS", "Python", "MongoDB", "Firebase"] },
      { title: "Tools", items: ["Vercel", "Git & GitHub", "Visual Studio Code"] },
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


    // Chatbot
    chatbotLauncher: "Ask AI",
    chatbotTitle: "Ask me anything",
    chatbotClose: "Close chat",
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
    // Header / nav
    about: "自己紹介",
    projects: "プロジェクト",
    skills: "スキル",
    contact: "連絡先",

    // Hero
    heroTitle: "研究とアルバイトで、Webアプリを作っている情報学専攻の大学院生です。",
    heroAffiliation: "大阪公立大学 · 情報学専攻",
    heroCta: "連絡する",

    // Section titles & labels
    aboutMe: "自己紹介",
    technologiesLabel: "使用技術",
    achievementsLabel: "成果・特記事項",
    enlargeMedia: "拡大表示",
    linkDemo: "デモ",
    linkRepo: "コード",
    linkPaper: "論文",
    linkOpen: "リンク",

    // Contact / footer
    contactTitle: "連絡先",
    contactLead: "お仕事や研究のご相談など、お気軽にご連絡ください。",
    backToTop: "トップへ戻る",
    skipToContent: "メインコンテンツへ",

    // About content
    aboutDescription: "大阪公立大学で情報学を専攻している大学院生です。普段はAIも活用しながらWebアプリを作っています。新しい技術を触って、実際に動くものを形にするのが好きです。コーディング以外では、バラエティ番組（主に千鳥の番組）やアニメ、漫画を見たり、筋トレをするのが好きです。",

    // Skills
    skillGroups: [
      { title: "Frontend", items: ["Next.js", "TypeScript", "Angular"] },
      { title: "Backend / Data", items: ["NestJS", "Python", "MongoDB", "Firebase"] },
      { title: "Tools", items: ["Vercel", "Git & GitHub", "Visual Studio Code"] },
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


    // Chatbot
    chatbotLauncher: "AIに質問",
    chatbotTitle: "何でも聞いてください",
    chatbotClose: "チャットを閉じる",
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
