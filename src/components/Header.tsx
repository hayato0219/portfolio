'use client';

import React from 'react';
import type { Translations } from '@/types';

interface HeaderProps {
  t: Translations;
  language: 'en' | 'ja';
  changeLanguage: (lang: 'en' | 'ja') => void;
}

const Header: React.FC<HeaderProps> = ({ t, language, changeLanguage }) => {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#home" className="brand">
          Hayato Seki<span className="brand__dot">.</span>
        </a>

        <nav className="nav" aria-label="Primary">
          <a href="#home" className="nav__link">
            {t.home}
          </a>
          <a href="#about" className="nav__link">
            {t.about}
          </a>
          <a href="#footer" className="nav__link">
            {t.contact}
          </a>
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
