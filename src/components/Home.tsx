import React from 'react';
import type { SiteProps, Translations } from '@/types';
import Section from './Section';
import { Services } from './experience';
import { ArrowUpRight } from './icons';

interface HomeProps {
  siteProps: SiteProps;
  t: Translations;
}

const Home: React.FC<HomeProps> = ({ siteProps, t }) => {
  return (
    <>
      <section id="home" className="hero">
        <div className="container reveal">
          <div className="hero__meta">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero__avatar"
              src="/images/me.jpeg"
              alt=""
              width={56}
              height={56}
            />
            <div>
              <p className="hero__name">{siteProps.name}</p>
              <p className="hero__affiliation">{t.heroAffiliation}</p>
            </div>
          </div>

          <h1 className="hero__title jp-text">{t.heroTitle}</h1>

          <div className="hero__actions">
            <a href="#contact" className="btn">
              {t.heroCta}
            </a>
            <a
              href={`https://github.com/${siteProps.socials.gitHub}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              GitHub
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <Section id="about" num="01" title={t.aboutMe}>
        <p className="about__text jp-text">{t.aboutDescription}</p>
      </Section>

      <Section id="projects" num="02" title={t.projects}>
        <Services services={t.experienceList} t={t} />
      </Section>

      <Section id="skills" num="03" title={t.skills}>
        <div className="skills">
          {t.skillGroups.map((group) => (
            <div key={group.title} className="skills__group">
              <h3 className="mono-label">{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Home;
