'use client';

import React, { useEffect, useState } from 'react';
import type { Translations } from '@/types';

interface HeaderProps {
  t: Translations;
  language: 'en' | 'ja';
  changeLanguage: (lang: 'en' | 'ja') => void;
}

const NAV_ITEMS = [
  { id: 'about', key: 'about' as const },
  { id: 'projects', key: 'projects' as const },
  { id: 'skills', key: 'skills' as const },
  { id: 'contact', key: 'contact' as const },
];

const LANGS = [
  { value: 'ja' as const, label: 'JA', name: '日本語' },
  { value: 'en' as const, label: 'EN', name: 'English' },
];

const Header: React.FC<HeaderProps> = ({ t, language, changeLanguage }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="container site-header__inner">
        <a href="#home" className="brand">
          Hayato Seki
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
          <div className="lang" role="group" aria-label="Language">
            {LANGS.map((lang, i) => (
              <React.Fragment key={lang.value}>
                {i > 0 && <span aria-hidden="true">/</span>}
                <button
                  type="button"
                  className="lang__btn"
                  lang={lang.value}
                  aria-label={lang.name}
                  aria-pressed={language === lang.value}
                  onClick={() => changeLanguage(lang.value)}
                >
                  {lang.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
