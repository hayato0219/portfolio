import React from 'react';
import type { Translations } from '@/types';

interface AboutMeProps {
  about: string;
  t: Translations;
}

const AboutMe: React.FC<AboutMeProps> = ({ about, t }) => (
  <section id="about" style={{ scrollMarginTop: 'calc(var(--header-h) + 1rem)' }}>
    <h2 className="section-title">{t.aboutMe}</h2>
    <p className="about__text">{about}</p>
  </section>
);

export default AboutMe;
