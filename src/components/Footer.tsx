import React from 'react';
import type { Translations } from '@/types';

interface FooterProps {
  name: string;
  email: string;
  gitHub: string;
  t: Translations;
}

const Footer: React.FC<FooterProps> = ({ name, email, gitHub, t }) => {
  return (
    <footer id="footer" className="site-footer">
      <div className="container">
        <h2 className="site-footer__title">{t.contactTitle}</h2>

        <div className="socials">
          {email && (
            <a
              href={`mailto:${email}`}
              className="social-link"
              title={t.email}
              aria-label={t.email}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 6 10-6" />
              </svg>
            </a>
          )}
          {gitHub && (
            <a
              href={`https://github.com/${gitHub}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title={t.github}
              aria-label={t.github}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
              </svg>
            </a>
          )}
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <a href="#home">{t.home}</a>
          <a href="#about">{t.about}</a>
          <a href="#footer">{t.contact}</a>
        </nav>

        <div className="site-footer__bottom">
          <p className="site-footer__credit">
            © {new Date().getFullYear()} {name} · Built with Next.js
          </p>
          <a href="#home" className="site-footer__top">
            {t.backToTop || 'Back to top'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
