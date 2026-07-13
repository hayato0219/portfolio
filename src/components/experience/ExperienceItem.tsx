'use client';

import React from 'react';
import Image from 'next/image';
import type {
  Translations,
  ExperienceItem as ExperienceItemType,
  ProjectLinkType,
} from '@/types';

interface ExperienceItemProps {
  item: ExperienceItemType;
  currentImageIndex: number;
  onImageNavigation: (direction: 'next' | 'prev', imageCount: number) => void;
  onImageClick: (
    imageList: string[],
    currentIndex: number,
    caption: string
  ) => void;
  t: Translations;
}

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov'];
const isVideo = (filename: string) =>
  VIDEO_EXTENSIONS.some((ext) => filename.toLowerCase().endsWith(ext));

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  item,
  currentImageIndex,
  onImageNavigation,
  onImageClick,
  t,
}) => {
  const images = item.images ?? [];
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;
  const currentName = hasImages ? images[currentImageIndex] : '';
  const mediaPath = hasImages ? `/images/${currentName}` : '';
  const currentIsVideo = hasImages && isVideo(currentName);

  const achievements = item.tags
    ? item.tags.split('\n').filter((tag) => tag.trim())
    : [];

  return (
    <article className="xp-card">
      {hasImages && (
        <div className="xp-card__media">
          <button
            type="button"
            className="xp-card__media-trigger"
            aria-label={`${item.title} — 拡大表示`}
            onClick={() => onImageClick(images, currentImageIndex, item.title)}
          >
            {currentIsVideo ? (
              <>
                <video
                  src={mediaPath}
                  muted
                  playsInline
                  preload="metadata"
                  tabIndex={-1}
                />
                <span className="xp-card__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </>
            ) : (
              <Image src={mediaPath} alt={item.title} width={300} height={220} />
            )}
          </button>

          {hasMultipleImages && (
            <>
              <button
                type="button"
                className="xp-card__nav xp-card__nav--prev"
                aria-label="Previous image"
                onClick={() => onImageNavigation('prev', images.length)}
              >
                ‹
              </button>
              <button
                type="button"
                className="xp-card__nav xp-card__nav--next"
                aria-label="Next image"
                onClick={() => onImageNavigation('next', images.length)}
              >
                ›
              </button>
              <span className="xp-card__counter">
                {currentImageIndex + 1} / {images.length}
              </span>
            </>
          )}
        </div>
      )}

      <div className="xp-card__body">
        <h3 className="xp-card__title">{item.title}</h3>
        {item.date && <span className="xp-card__date">{item.date}</span>}
        {item.description && <p className="xp-card__desc">{item.description}</p>}

        {item.links && item.links.length > 0 && (
          <div className="xp-card__links">
            {item.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="xp-link"
              >
                <LinkIcon type={link.type} />
                {linkLabel(link.type, t)}
              </a>
            ))}
          </div>
        )}

        {item.technologies && item.technologies.length > 0 && (
          <div>
            <div className="field__label field__label--tech">
              {t.technologiesLabel}
            </div>
            <div className="chip-row">
              {item.technologies.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {achievements.length > 0 && (
          <div>
            <div className="field__label field__label--achv">
              {t.achievementsLabel}
            </div>
            <div className="achv">
              {achievements.map((tag, index) => (
                <div key={index} className="achv__item">
                  <span className="achv__bullet" aria-hidden="true">
                    ・
                  </span>
                  <span style={{ flex: 1 }}>{renderWithLinks(tag)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

const ExternalLinkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
  </svg>
);

const linkLabel = (type: ProjectLinkType, t: Translations): string => {
  switch (type) {
    case 'demo':
      return t.linkDemo || 'Demo';
    case 'repo':
      return t.linkRepo || 'Code';
    case 'paper':
      return t.linkPaper || 'Paper';
    default:
      return t.linkOpen || 'Link';
  }
};

const LinkIcon = ({ type }: { type: ProjectLinkType }) => {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  if (type === 'repo') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
      </svg>
    );
  }
  if (type === 'paper') {
    return (
      <svg {...common}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    );
  }
  // demo / link → external arrow
  return (
    <svg {...common}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6M10 14 21 3" />
    </svg>
  );
};

/** Turn bare URLs inside achievement text into compact link pills (hostname). */
const renderWithLinks = (text: string): React.ReactNode => {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, i) => {
    if (!/^https?:\/\//.test(part)) {
      return <React.Fragment key={i}>{part}</React.Fragment>;
    }
    let host = part;
    try {
      host = new URL(part).hostname.replace(/^www\./, '');
    } catch {
      /* keep raw */
    }
    return (
      <a
        key={i}
        className="link-pill"
        href={part}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLinkIcon />
        {host}
      </a>
    );
  });
};

export default ExperienceItem;
