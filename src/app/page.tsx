'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Home from '@/components/Home';
import Chatbot from '@/components/Chatbot';
import Footer from '@/components/Footer';
import { translations } from '@/translations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
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

  const changeLanguage = (lang: 'en' | 'ja') => {
    setLanguage(lang);
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* ignore storage errors */
    }
  };

  // Restore saved preference, or fall back to the browser language on first visit.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('lang');
    } catch {
      /* ignore */
    }
    if (saved === 'en' || saved === 'ja') {
      setLanguage(saved);
    } else if (navigator.language && !navigator.language.startsWith('ja')) {
      setLanguage('en');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useScrollReveal();

  const t = translations[language];

  return (
    <>
      <a href="#home" className="skip-link">
        {language === 'ja' ? 'メインコンテンツへ' : 'Skip to content'}
      </a>
      <Header t={t} language={language} changeLanguage={changeLanguage} />
      <main>
        <Home siteProps={siteProps} t={t} />
      </main>
      <Footer {...siteProps.socials} name={siteProps.name} t={t} />
      <Chatbot t={t} siteProps={siteProps} />
    </>
  );
}
