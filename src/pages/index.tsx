'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Home from '@/components/Home';
import Chatbot from '@/components/Chatbot';
import Footer from '@/components/Footer';
import { translations } from '@/translations';
import type { SiteProps } from '@/types';

const siteProps: SiteProps = {
  name: "Hayato Seki",
  title: "Graduate Student Portfolio",
  socials: {
    email: "0219ha8ya8to10@gmail.com",
    gitHub: "hayato0219",
  },
};

export default function Index() {
  const [language, setLanguage] = useState<'en' | 'ja'>("ja");
  
  const changeLanguage = (lang: 'en' | 'ja') => {
    setLanguage(lang);
  };

  const t = translations[language];

  return (
    <div id="main">
      <Header t={t} language={language} changeLanguage={changeLanguage} />
      <Home siteProps={siteProps} t={t} />
      <Footer {...siteProps.socials} name={siteProps.name} t={t} />
      <Chatbot t={t} siteProps={siteProps} />
    </div>
  );
}
