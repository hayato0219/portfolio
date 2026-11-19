'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Home from '@/components/Home';
import Chatbot from '@/components/Chatbot';
import Footer from '@/components/Footer';
import { translations } from '@/translations';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useChat } from '@/hooks/useChat';
import { siteProps } from '@/siteConfig';

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
  const chat = useChat(t, language);
  const [chatOpen, setChatOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const openChat = useCallback(() => setChatOpen(true), []);

  // The hero has its own prompt; only offer the floating launcher once it scrolls away.
  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) =>
      setHeroVisible(entry.isIntersecting)
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <a href="#home" className="skip-link">
        {t.skipToContent}
      </a>
      <Header t={t} language={language} changeLanguage={changeLanguage} />
      <main>
        <Home siteProps={siteProps} t={t} chat={chat} onContinueChat={openChat} />
      </main>
      <Footer {...siteProps.socials} name={siteProps.name} t={t} />
      <Chatbot
        t={t}
        chat={chat}
        isOpen={chatOpen}
        onOpenChange={setChatOpen}
        showLauncher={!heroVisible}
      />
    </>
  );
}
