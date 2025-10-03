'use client';

import React from 'react';
import Image from 'next/image';
import type { SiteProps, Translations } from '@/types';
import image from '../images/me.jpeg';
import SkillSet from './SkillSet';
import AboutMe from './AboutMe';
import Services from './Services';
import Tools from './Tools';

const imageAltText = 'Hayato Seki';

interface HomeProps {
  siteProps: SiteProps;
  t: Translations;
}

const Home: React.FC<HomeProps> = ({ siteProps, t }) => {
  const { name } = siteProps;

  const containerStyle: React.CSSProperties = {
    padding: '2rem 4rem',
    margin: '0 auto',
    maxWidth: '1200px',
    display: 'flex',
    gap: '4rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
  };

  // レスポンシブ対応
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // クライアントサイドでのみwindowにアクセス
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const responsiveContainerStyle: React.CSSProperties = {
    ...containerStyle,
    flexDirection: isMobile ? 'column' : 'row',
    padding: isMobile ? '1.5rem 1rem' : '2rem 4rem',
    gap: isMobile ? '2rem' : '4rem',
  };

  const leftColumnStyle: React.CSSProperties = { 
    flex: '1', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '2.5rem',
    minWidth: isMobile ? '100%' : 'auto',
  };
  
  const rightColumnStyle: React.CSSProperties = { 
    flex: '2', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '2.5rem',
    minWidth: isMobile ? '100%' : 'auto',
  };

  return (
    <section id="home" style={{ backgroundColor: '#fff', paddingTop: '5rem' }}>
      <div style={responsiveContainerStyle}>
        <div style={leftColumnStyle}>
          <div style={{ textAlign: 'center' }}>
            <Image 
              src={image} 
              alt={imageAltText} 
              width={180}
              height={180}
              style={{ borderRadius: '50%', objectFit: 'cover' }} 
            />
            <h3 style={{ marginTop: '1.5rem', color: '#333', fontSize: '1.4rem', fontWeight: '600', whiteSpace: 'pre-line' }}>{t.greeting}</h3>
          </div>
          <SkillSet skills={t.skills} t={t} />
          <Tools tools={t.toolsList} t={t} />
        </div>
        <div style={rightColumnStyle}>
          <AboutMe about={t.aboutDescription} t={t} />
          <Services services={t.experienceList} t={t} />
        </div>
      </div>
    </section>
  );
};

export default Home;
