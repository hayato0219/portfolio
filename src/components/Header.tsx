'use client';

import React, { useEffect, useState } from 'react';
import type { Translations } from '@/types';

interface HeaderProps {
  t: Translations;
  language: 'en' | 'ja';
  changeLanguage: (lang: 'en' | 'ja') => void;
}

const NAV_ITEMS = [
  { id: 'home', key: 'home' as const },
  { id: 'about', key: 'about' as const },
  { id: 'footer', key: 'contact' as const },
];

const Header: React.FC<HeaderProps> = ({ t, language, changeLanguage }) => {
  const [activeId, setActiveId] = useState('home');

  // Scroll-spy: highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#home" className="brand">
          Hayato Seki<span className="brand__dot">.</span>
        </a>

        <nav className="nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav__link${
                activeId === item.id ? ' nav__link--active' : ''
              }`}
              aria-current={activeId === item.id ? 'true' : undefined}
            >
              {t[item.key]}
            </a>
          ))}
          <select
            className="lang-switch"
            value={language}
            onChange={(e) => changeLanguage(e.target.value as 'en' | 'ja')}
            aria-label="Language"
          >
            <option value="ja">日本語</option>
            <option value="en">English</option>
          </select>
        </nav>
      </div>
    </header>
  );
};

export default Header;
