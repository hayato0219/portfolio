import type { TranslationsObject } from './types';

export const translations: TranslationsObject = {
  en: {
    // Header
    home: "Home",
    about: "About",
    contact: "Contact",

    // Home/Intro
    greeting: "Hi there!\nI'm Hayato Seki!",

    // Sections
    aboutMe: "About Me",
    skillSet: "Skill Set",
    experience: "Experience",
    tools: "Tools",
    technologiesLabel: "Technologies",
    achievementsLabel: "Achievements",

    // Footer
    contactTitle: "Contact",
    email: "Email",
    github: "GitHub",
    createdBy: "Created by",
    creatorName: "Hayato Seki",

    // Language toggle
    switchToJapanese: "Japanese",
    switchToEnglish: "English",

    // About content
    aboutDescription: "I am a graduate student majoring in Informatics, primarily developing Next.js web applications using AI coding. I aim to solve real-world challenges by delivering advanced IT technologies to users through front-end development. My personality is honest, empathetic, and modest. My hobbies include watching variety shows (mainly Chidori's programs), anime, manga, and working out.",

    // Skills
    skills: [
      "Python",
      "Next.js",
      "TypeScript",
      "Machine Learning",
      "Data Analysis",
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
            technologies: "Next.js(TypeScript), shadcn/ui, vercel, MongoDB, Firebase (Storage), OpenAI API (DALL-E3), Azure Speech Services API (Pronunciation Assessment)",
            images: ["currentResearch.png", "currentResearch-ImageGeneration.mp4", "currentResearch-ImageEdit.mp4","currentResearch-PronunciationAssessment.mp4"]
          },
          {
            title: "5-day Internships at 2 Companies",
            description: "Participated in internships at Rakuten and BIPROGY",
            date: "Development Period: 2025/08",
            technologies: "Next.js(TypeScript), MongoDB, Firebase (Firestore, Cloud Functions)",
            tags: "Won the Excellence Award at BIPROGY",
            images: ["internshipICON.jpg"]
          },
          {
            title: "App Created in Data Analysis Course",
            description: "Created an app to visualize Osaka Metro's ticket gate passage data and Sumitomo Electric's car navigation sudden deceleration data",
            date: "Development Period: 2025/07",
            technologies: "Next.js(TypeScript), Flask(Python), OpenStreetMap, Leaflet.js",
            tags: "Won 1st place among all 8 teams",
            images: ["nakamozuApp.png"]
          }
        ]
      },
      {
        year: "2024",
        items: [
          {
            title: "Graduation Thesis Research",
            description: "Estimated speech bubbles containing words that readers did not understand from their audio and eye-tracking information while reading English manga aloud",
            date: "Research Period: 2024/4 - 2025/3",
            technologies: "Python",
            tags: "Oral presentation at ABC2025 (peer-reviewed international conference)\nPaper URL: https://ieeexplore.ieee.org/document/11118482\nConducted experiments in France",
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
  },
  ja: {
    // Header
    home: "ホーム",
    about: "自己紹介",
    contact: "お問い合わせ",

    // Home/Intro
    greeting: "こんにちは！\n関勇人（せきはやと）です！",

    // Sections
    aboutMe: "自己紹介",
    skillSet: "スキルセット",
    experience: "経験",
    tools: "ツール",
    technologiesLabel: "使用技術",
    achievementsLabel: "成果・特記事項",

    // Footer
    contactTitle: "お問い合わせ",
    email: "メール",
    github: "GitHub",
    createdBy: "作成者",
    creatorName: "関勇人",

    // Language toggle
    switchToJapanese: "日本語",
    switchToEnglish: "英語",

    // About content
    aboutDescription: "私は情報学専攻の大学院生で、主にNext.jsのWebアプリをAIコーディングによって開発しています。より高度なIT技術をフロントエンドを介してユーザーに届けることで実社会の課題を解決したいと考えています。性格は素直で、共感力があり、控えめです。趣味はバラエティ番組（主に千鳥の番組）、アニメ、漫画を見ることと筋トレをすることです。",

    // Skills
    skills: [
      "Python",
      "Next.js",
      "TypeScript",
      "機械学習",
      "データ分析",
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
            technologies: "Next.js(TypeScript), shadcn/ui, vercel, MongoDB, Firebase (Storage), OpenAI API (DALL-E3), Azure Speech Services API (Pronunciation Assessment)",
            images: ["currentResearch.png", "currentResearch-ImageGeneration.mp4", "currentResearch-ImageEdit.mp4", "currentResearch-PronunciationAssessment.mp4"]
          },
          {
            title: "2社の5daysインターン",
            description: "楽天、BIPROGYのインターンに行きました",
            date: "開発期間: 2025/08",
            technologies: "Next.js(TypeScript), MongoDB, Firebase (Firestore, Cloud Functions)",
            tags: "BIPROGYは最優秀賞を受賞しました",
            images: ["internshipICON.jpg"]
          },
          {
            title: "データ分析の授業で作成したアプリ",
            description: "大阪メトロさんの改札通過データと住友電工さんのカーナビの急減速データを可視化したアプリを作成しました",
            date: "開発期間: 2025/07",
            technologies: "Next.js(TypeScript), Flask(Python), OpenStreetMap, Leaflet.js",
            tags: "全8チームの中で優勝しました",
            images: ["nakamozuApp.png"]
          }
        ]
      },
      {
        year: "2024",
        items: [
          {
            title: "卒業論文の研究",
            description: "英語漫画を音読してもらい、その音声と視線情報から音読者の意味の分からない単語を含む吹き出しを推定しました",
            date: "研究期間: 2024/4 - 2025/3",
            technologies: "Python",
            tags: "ABC2025(査読ありの国際学会)で口頭発表\n論文のURL: https://ieeexplore.ieee.org/document/11118482\nフランスでの実験を行いました",
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
  }
};
