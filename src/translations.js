export const translations = {
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
    aboutDescription: "I am a graduate student in Computer Science with a passion for developing innovative software solutions. My research focuses on machine learning, and I am eager to apply my academic knowledge and practical skills to real-world challenges in an internship role. I am a quick learner, a collaborative team player, and I am excited about opportunities where I can contribute and grow.",
    
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
            technologies: "Technologies: Next.js(TypeScript), shadcn/ui, vercel, MongoDB, Firebase (Storage), OpenAI API (DALL-E3), Azure Speech Services API (Pronunciation Assessment)",
            image: "currentResearch.png"
          },
          {
            title: "5-day Internships at 2 Companies",
            description: "Participated in internships at Rakuten and BIPROGY",
            date: "Development Period: 2025/08",
            technologies: "Technologies: Next.js(TypeScript), MongoDB, Firebase (Firestore, Cloud Functions)",
            tags: "→ Won the Excellence Award at BIPROGY",
            image: "internshipICON.jpg"
          },
          {
            title: "App Created in Data Analysis Course",
            description: "Created an app to visualize Osaka Metro's ticket gate passage data and Sumitomo Electric's car navigation sudden deceleration data",
            date: "Development Period: 2025/07",
            technologies: "Technologies: Next.js(TypeScript), Flask(Python), OpenStreetMap, Leaflet.js",
            tags: "→ Won 1st place among all 8 teams",
            image: "nakamozuApp.png"
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
            technologies: "Technologies: Python",
            tags: "→ Oral presentation at ABC2025 (peer-reviewed international conference)\n(Paper URL: https://ieeexplore.ieee.org/document/11118482)\n→ Conducted experiments in France",
            image: "pastResearch.jpeg"
          },
        ]
      }
    ],
    
    // Tools list
    toolsList: [
      "Git & GitHub",
      "Docker",
      "Jupyter Notebooks",
      "Visual Studio Code"
    ],
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
    aboutDescription: "私はコンピュータサイエンスの大学院生で、革新的なソフトウェアソリューションの開発に情熱を注いでいます。研究は機械学習に焦点を当てており、インターンシップの役割で学術的知識と実践的なスキルを実世界の課題に適用することを熱望しています。私は学習が早く、協力的なチームプレーヤーであり、貢献し成長できる機会にワクワクしています。",
    
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
            technologies: "使用技術: Next.js(TypeScript), shadcn/ui, vercel, MongoDB, Firebase (Storage), OpenAI API (DALL-E3), Azure Speech Services API (Pronunciation Assessment)",
            image: "currentResearch.png"
          },
          {
            title: "2社の5daysインターン",
            description: "楽天、BIPROGYのインターンに行きました",
            date: "開発期間: 2025/08",
            technologies: "使用技術: Next.js(TypeScript), MongoDB, Firebase (Firestore, Cloud Functions)",
            tags: "→ BIPROGYは最優秀賞を受賞しました",
            image: "internshipICON.jpg"
          },
          {
            title: "データ分析の授業で作成したアプリ",
            description: "大阪メトロさんの改札通過データと住友電工さんのカーナビの急減速データを可視化したアプリを作成",
            date: "開発期間: 2025/07",
            technologies: "使用技術: Next.js(TypeScript), Flask(Python), OpenStreetMap, Leaflet.js",
            tags: "→ 全8チームの中で優勝しました",
            image: "nakamozuApp.png"
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
            technologies: "使用技術: Python",
            tags: "→ ABC2025(査読ありの国際学会)で口頭発表\n(論文のURL: https://ieeexplore.ieee.org/document/11118482)\n→ フランスでの実験を行いました",
            image: "pastResearch.jpeg"
          },
        ]
      }
    ],
    
    // Tools list
    toolsList: [
      "Git & GitHub",
      "Visual Studio Code"
    ],
  }
};
