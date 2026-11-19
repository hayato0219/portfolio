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
    projectsShowAll: "Show all",
    linkDemo: "Demo",
    linkRepo: "Code",
    linkPaper: "Paper",
    linkOpen: "Link",

    // Contact / footer
    contactTitle: "Contact",
    contactLead: "Feel free to reach out — about work, research, or anything else.",
    backToTop: "Back to top",
    skipToContent: "Skip to content",

    // Hero prompt
    askLabel: "Ask Hayato a question",
    askContinue: "Continue in chat",
    askClear: "Clear",

    // Project media scrubbing
    scrubHintHover: "Move across to scrub",
    scrubHintTouch: "Scroll to scrub",

    // Header status — update statusNow whenever you like
    statusCity: "Osaka",
    statusNow: "Working on my master's research",

    // Chat errors
    chatErrorUnavailable: "Chat is unavailable right now. Please try again later.",
    chatErrorBusy: "Too many requests. Please wait a moment and try again.",
    chatErrorGeneric: "Something went wrong. Please try again.",
    chatErrorNetwork: "Network error. Please check your connection.",

    // About content
    aboutDescription: "I'm a graduate student in Informatics at Osaka Metropolitan University. These days I build web apps, making good use of AI along the way. I enjoy trying out new technologies and turning ideas into things that actually work. Outside of coding, I like variety shows (mainly Chidori's programs), anime, manga, and working out.",

    // Skills
    skillGroups: [
      { title: "Frontend", items: ["Next.js", "React", "TypeScript", "Angular"] },
      { title: "Backend / Data", items: ["NestJS", "Hono", "Go", "Python (Flask)", "MongoDB", "Firebase"] },
      { title: "Cloud / AI", items: ["Vercel", "Cloudflare Workers", "Google Cloud", "Gemini API", "OpenAI API", "Azure Speech"] },
      { title: "Tools / Testing", items: ["Git & GitHub", "Vitest", "Playwright", "Visual Studio Code"] },
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
        year: "2026",
        items: [
          {
            title: "StudyOS (personal project)",
            description: "A personal app for learning English expressions and software engineering a little every day. For English, I record what I wanted to say in Japanese by voice or text, AI suggests natural English for each situation, and I review it with spaced repetition. For software engineering, I answer short written questions from a curriculum of 208 topics across 11 areas such as databases and networking, and AI grades them.",
            date: "Development Period: 2026/09 -",
            technologies: ["TypeScript", "React", "Hono", "Cloudflare Workers", "Gemini API"],
            images: ["studyos-cover.png"],
          },
        ],
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
    projectsShowAll: "すべて表示",
    linkDemo: "デモ",
    linkRepo: "コード",
    linkPaper: "論文",
    linkOpen: "リンク",

    // Contact / footer
    contactTitle: "連絡先",
    contactLead: "お仕事や研究のご相談など、お気軽にご連絡ください。",
    backToTop: "トップへ戻る",
    skipToContent: "メインコンテンツへ",

    // Hero prompt
    askLabel: "関に質問する",
    askContinue: "チャットで続ける",
    askClear: "クリア",

    // Project media scrubbing
    scrubHintHover: "左右に動かしてコマ送り",
    scrubHintTouch: "スクロールでコマ送り",

    // Header status — statusNow は好きなときに書き換えてください
    statusCity: "大阪",
    statusNow: "修士研究に取り組み中",

    // Chat errors
    chatErrorUnavailable: "チャット機能は現在利用できません。少し時間をおいてお試しください。",
    chatErrorBusy: "リクエストが混み合っています。少し時間をおいてから再度お試しください。",
    chatErrorGeneric: "エラーが発生しました。もう一度お試しください。",
    chatErrorNetwork: "ネットワークエラーです。インターネット接続を確認してください。",

    // About content
    aboutDescription: "大阪公立大学で情報学を専攻している大学院生です。普段はAIも活用しながらWebアプリを作っています。新しい技術を触って、実際に動くものを形にするのが好きです。コーディング以外では、バラエティ番組（主に千鳥の番組）やアニメ、漫画を見たり、筋トレをするのが好きです。",

    // Skills
    skillGroups: [
      { title: "Frontend", items: ["Next.js", "React", "TypeScript", "Angular"] },
      { title: "Backend / Data", items: ["NestJS", "Hono", "Go", "Python (Flask)", "MongoDB", "Firebase"] },
      { title: "Cloud / AI", items: ["Vercel", "Cloudflare Workers", "Google Cloud", "Gemini API", "OpenAI API", "Azure Speech"] },
      { title: "Tools / Testing", items: ["Git & GitHub", "Vitest", "Playwright", "Visual Studio Code"] },
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
        year: "2026",
        items: [
          {
            title: "StudyOS（個人開発）",
            description: "英語の言い回しとソフトウェアエンジニアリングの知識を、毎日少しずつ学ぶための自分用の学習アプリです。英語は、言いたかった日本語を声やテキストで記録するとAIが場面に合った英語を返し、それを間隔を空けて復習します。ソフトウェアエンジニアリングは、データベースやネットワークなど11分野・208項目のカリキュラムに沿って記述式の問題に答え、AIが採点します。",
            date: "開発期間: 2026/09 -",
            technologies: ["TypeScript", "React", "Hono", "Cloudflare Workers", "Gemini API"],
            images: ["studyos-cover.png"],
          },
        ],
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
