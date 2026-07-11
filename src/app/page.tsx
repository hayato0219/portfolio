'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Home from '@/components/Home';
import Chatbot from '@/components/Chatbot';
import Footer from '@/components/Footer';
import { translations } from '@/translations';
import type { SiteProps } from '@/types';

const siteProps: SiteProps = {
  name: 'Hayato Seki',
  title: 'Graduate Student Portfolio',
  socials: {
    email: '0219ha8ya8to10@gmail.com',
    gitHub: 'hayato0219',
  },
};

export default function Page() {
  const [language, setLanguage] = useState<'en' | 'ja'>('ja');

  const changeLanguage = (lang: 'en' | 'ja') => setLanguage(lang);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  return (
    <>
      <Header t={t} language={language} changeLanguage={changeLanguage} />
      <main>
        <Home siteProps={siteProps} t={t} />
      </main>
      <Footer {...siteProps.socials} name={siteProps.name} t={t} />
      <Chatbot t={t} siteProps={siteProps} />
    </>
  );
}
