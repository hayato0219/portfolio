'use client';

import React from 'react';
import type {
  Translations,
  ExperienceItem as ExperienceItemType,
  ProjectLinkType,
} from '@/types';
import { ArrowUpRight, ChevronLeft, ChevronRight } from '../icons';
import ScrubVideo from './ScrubVideo';

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
  /** The project index already shows the title and period in its row. */
  showHead?: boolean;
}

export const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov'];
export const isVideo = (filename: string) =>
  VIDEO_EXTENSIONS.some((ext) => filename.toLowerCase().endsWith(ext));

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  item,
  currentImageIndex,
  onImageNavigation,
  onImageClick,
  t,
  showHead = true,
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
    <article className="project">
      {hasImages && (
        <div className="project__media">
          <button
            type="button"
            className="project__media-trigger"
            aria-label={`${item.title} — ${t.enlargeMedia}`}
            onClick={() => onImageClick(images, currentImageIndex, item.title)}
          >
            {currentIsVideo ? (
              <ScrubVideo
                key={currentName}
                src={`/images/previews/${currentName}`}
                hintHover={t.scrubHintHover}
                hintTouch={t.scrubHintTouch}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={mediaPath} alt={item.title} loading="lazy" />
            )}
          </button>

          {hasMultipleImages && (
            <>
              <button
                type="button"
                className="project__nav project__nav--prev"
                aria-label="Previous image"
                onClick={() => onImageNavigation('prev', images.length)}
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                className="project__nav project__nav--next"
                aria-label="Next image"
                onClick={() => onImageNavigation('next', images.length)}
              >
                <ChevronRight />
              </button>
              <span className="project__counter">
                {currentImageIndex + 1} / {images.length}
              </span>
            </>
          )}
        </div>
      )}

      {showHead && (
        <div className="project__head">
          <h3 className="project__title">{item.title}</h3>
          {item.date && <span className="mono-label">{item.date}</span>}
        </div>
      )}

      {item.description && (
        <p className="project__desc jp-text">{item.description}</p>
      )}

      {((item.technologies && item.technologies.length > 0) ||
        achievements.length > 0) && (
        <dl className="project__facts">
          {item.technologies && item.technologies.length > 0 && (
            <>
              <dt className="mono-label">{t.technologiesLabel}</dt>
              <dd>
                <ul className="inline-list">
                  {item.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </dd>
            </>
          )}
          {achievements.length > 0 && (
            <>
              <dt className="mono-label">{t.achievementsLabel}</dt>
              <dd>
                <ul className="project__achv">
                  {achievements.map((tag, index) => (
                    <li key={index}>{renderWithLinks(tag)}</li>
                  ))}
                </ul>
              </dd>
            </>
          )}
        </dl>
      )}

      {item.links && item.links.length > 0 && (
        <div className="project__links">
          {item.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              {linkLabel(link.type, t)}
              <ArrowUpRight />
            </a>
          ))}
        </div>
      )}
    </article>
  );
};

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

/** Turn bare URLs inside achievement text into compact links (hostname). */
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
        className="text-link"
        href={part}
        target="_blank"
        rel="noopener noreferrer"
      >
        {host}
        <ArrowUpRight />
      </a>
    );
  });
};

export default ExperienceItem;
