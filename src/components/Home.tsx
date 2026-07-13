import React from 'react';
import {
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiAngular,
  SiNestjs,
  SiMongodb,
  SiFirebase,
  SiVercel,
  SiGit,
  SiGithub,
  SiOpenstreetmap,
  SiFlask,
  SiLeaflet,
  SiShadcnui,
} from 'react-icons/si';
import type { SiteProps, Translations } from '@/types';
import TagList from './TagList';
import AboutMe from './AboutMe';
import { Services } from './experience';

interface HomeProps {
  siteProps: SiteProps;
  t: Translations;
}

// Real tech logos (technologies actually used). Add a new one here as you learn it —
// the marquee scales automatically, no layout work required.
const HERO_TECH: { Icon: React.ComponentType; name: string; color: string }[] = [
  { Icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
  { Icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
  { Icon: SiPython, name: 'Python', color: '#3776AB' },
  { Icon: SiFirebase, name: 'Firebase', color: '#FFA000' },
  { Icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
  { Icon: SiNestjs, name: 'NestJS', color: '#E0234E' },
  { Icon: SiVercel, name: 'Vercel', color: '#000000' },
  { Icon: SiOpenstreetmap, name: 'OpenStreetMap', color: '#7EBC6F' },
  { Icon: SiAngular, name: 'Angular', color: '#DD0031' },
  { Icon: SiShadcnui, name: 'shadcn/ui', color: '#000000' },
  { Icon: SiGit, name: 'Git', color: '#F05032' },
  { Icon: SiLeaflet, name: 'Leaflet', color: '#199900' },
  { Icon: SiFlask, name: 'Flask', color: '#000000' },
  { Icon: SiGithub, name: 'GitHub', color: '#181717' },
];

// Colored tech icons roaming the hero background — deterministic start positions
// (SSR-safe); each travels a long looping path so they wander all over.
const BG_ICONS = Array.from({ length: 30 }, (_, i) => {
  const { Icon, color } = HERO_TECH[i % HERO_TECH.length];
  return {
    Icon,
    color,
    left: (i * 29 + 7) % 95,
    top: (i * 47 + 6) % 88,
    size: 26 + (i % 4) * 8,
    duration: 24 + (i % 7) * 3,
    delay: -((i * 3.1) % 20),
    roam: (i % 6) + 1,
  };
});

const Home: React.FC<HomeProps> = ({ siteProps, t }) => {
  return (
    <>
      <section id="home" className="hero">
        <div className="hero__decor" aria-hidden="true">
          <span className="hero__orb hero__orb--a" />
          <span className="hero__orb hero__orb--b" />
          {BG_ICONS.map(({ Icon, color, left, top, size, duration, delay, roam }, i) => (
            <span
              key={i}
              className="hero-bg-icon"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                color,
                animationName: `roam-${roam}`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            >
              <Icon />
            </span>
          ))}
        </div>
        <div className="container hero__inner reveal">
          <div className="hero__intro">
            <h1 className="hero__greeting">{t.greeting}</h1>
            {t.heroTagline && <p className="hero__role">{t.heroTagline}</p>}
            <div className="hero__actions">
              <a href="#footer" className="btn">
                {t.contact}
              </a>
              <a
                href={`https://github.com/${siteProps.socials.gitHub}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
          <div className="hero__avatar">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/me.jpeg" alt="Hayato Seki" width={300} height={300} />
          </div>
        </div>
      </section>

      <div className="container layout">
        <aside className="layout__aside reveal">
          <TagList title={t.skillSet} items={t.skills} />
          <TagList title={t.tools} items={t.toolsList} />
        </aside>
        <div className="layout__main">
          <div className="reveal">
            <AboutMe about={t.aboutDescription} t={t} />
          </div>
          <div className="reveal">
            <Services services={t.experienceList} t={t} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
