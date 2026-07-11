import React from 'react';
import Image from 'next/image';
import type { SiteProps, Translations } from '@/types';
import TagList from './TagList';
import AboutMe from './AboutMe';
import { Services } from './experience';

interface HomeProps {
  siteProps: SiteProps;
  t: Translations;
}

const Home: React.FC<HomeProps> = ({ t }) => {
  return (
    <>
      <section id="home" className="hero">
        <div className="container hero__inner">
          <div className="hero__avatar">
            <Image
              src="/images/me.jpeg"
              alt="Hayato Seki"
              width={168}
              height={168}
              priority
            />
          </div>
          <div>
            <h1 className="hero__greeting">{t.greeting}</h1>
            {t.heroTagline && <p className="hero__role">{t.heroTagline}</p>}
          </div>
        </div>
      </section>

      <div className="container layout">
        <aside className="layout__aside">
          <TagList title={t.skillSet} items={t.skills} />
          <TagList title={t.tools} items={t.toolsList} />
        </aside>
        <div className="layout__main">
          <AboutMe about={t.aboutDescription} t={t} />
          <Services services={t.experienceList} t={t} />
        </div>
      </div>
    </>
  );
};

export default Home;
