import React from 'react';
import type { Translations } from '@/types';
import Section from './Section';
import { ArrowUp, ArrowUpRight } from './icons';

interface FooterProps {
  name: string;
  email: string;
  gitHub: string;
  t: Translations;
}

const Footer: React.FC<FooterProps> = ({ name, email, gitHub, t }) => {
  return (
    <>
      <Section id="contact" num="04" title={t.contactTitle} as="footer">
        <p className="contact__lead jp-text">{t.contactLead}</p>
        <div className="contact__links">
          {email && (
            <a href={`mailto:${email}`} className="text-link">
              {email}
            </a>
          )}
          {gitHub && (
            <a
              href={`https://github.com/${gitHub}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              GitHub
              <ArrowUpRight />
            </a>
          )}
        </div>
      </Section>
      <div className="container">
        <div className="site-footer__bottom">
          <p>
            © {new Date().getFullYear()} {name}
          </p>
          <a href="#home" className="site-footer__top">
            {t.backToTop || 'Back to top'}
            <ArrowUp />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
