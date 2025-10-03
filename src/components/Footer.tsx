'use client';

import React from 'react';
import type { Translations } from '@/types';

interface FooterProps {
  name: string;
  email: string;
  gitHub: string;
  t: Translations;
}

const envelopeIcon = '/images/socials/envelope.svg';
const gitHubIcon = '/images/socials/github.svg';

const Footer: React.FC<FooterProps> = ({ name, email, gitHub, t }) => {
  return (
    <div
      id="footer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        padding: "1rem 0 2rem",
        backgroundColor: "#1E1E1E",
        color: "white",
      }}
    >
      <h2>{t.contactTitle}</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2.5rem",
          alignItems: "center",
        }}
      >
        {email && (
          <a href={`mailto:${email}`} style={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center" }} title={t.email}>
            <img src={envelopeIcon} alt={t.email} style={{ width: "3rem", height: "3rem" }} />
          </a>
        )}
        {gitHub && (
          <a href={`https://github.com/${gitHub}`} target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center" }} title={t.github}>
            <img src={gitHubIcon} alt={t.github} style={{ width: "3rem", height: "3rem" }} />
          </a>
        )}
      </div>
      <p className="small" style={{ marginTop: 0 }}>
        {t.createdBy} {t.creatorName}
      </p>
    </div>
  );
};

export default Footer;
