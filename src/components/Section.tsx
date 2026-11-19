import React from 'react';

interface SectionProps {
  id: string;
  num: string;
  title: string;
  children: React.ReactNode;
  as?: 'section' | 'footer';
}

/** Numbered section with a sticky side label and a content column. */
const Section: React.FC<SectionProps> = ({ id, num, title, children, as = 'section' }) => {
  const Tag = as;
  return (
    <Tag id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="container section__grid reveal">
        <div className="section__label">
          <span className="section__num" aria-hidden="true">
            {num}
          </span>
          <h2 id={`${id}-title`} className="section__title">
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </Tag>
  );
};

export default Section;
