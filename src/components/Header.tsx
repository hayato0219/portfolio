'use client';

/**
 * Header component
 *
 * Top navigation bar for your site. Set to remain visible as the
 * user scrolls so that they can constantly reach any part of your page.
 */
import React, { useState, useEffect, type CSSProperties } from "react";
import type { Translations } from '@/types';

interface HeaderProps {
  t: Translations;
  language: 'en' | 'ja';
  changeLanguage: (lang: 'en' | 'ja') => void;
}

const Header: React.FC<HeaderProps> = ({ t, language, changeLanguage }) => {
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    // クライアントサイドでのみwindowにアクセス
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const headerStyle: CSSProperties = {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: isMobile ? "0.75rem" : "1rem",
    background: "black",
    width: "100%",
    zIndex: 10,
    color: "white",
    gap: isMobile ? "1rem" : "2rem",
    flexWrap: isMobile ? "wrap" : "nowrap",
  };

  const navStyle = {
    display: "flex",
    gap: isMobile ? "0.75rem" : "1.5rem",
    fontSize: isMobile ? "0.85rem" : "1rem",
  };

  const selectStyle = {
    background: "black",
    border: "1px solid white",
    color: "white",
    padding: isMobile ? "0.3rem 0.6rem" : "0.4rem 0.8rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: isMobile ? "0.75rem" : "0.85rem",
    outline: "none",
  };

  return (
    <div style={headerStyle}>     
      <div style={navStyle}>
        <a href="#home" style={{ color: "white" }}>
          {t.home}
        </a>
        <span>|</span>
        <a href="#about" style={{ color: "white" }}>{t.about}</a>
        <span>|</span>
        <a href="#footer" style={{ color: "white" }}>{t.contact}</a>
      </div>
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value as 'en' | 'ja')}
        style={selectStyle}
      >
        <option value="ja" style={{ background: "black", color: "white" }}>日本語</option>
        <option value="en" style={{ background: "black", color: "white" }}>English</option>
      </select>
    </div>
  );
};

export default Header;
