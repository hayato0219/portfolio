'use client';

import React from 'react';
import Image from 'next/image';
import type { Translations, ExperienceItem as ExperienceItemType } from '@/types';

interface ExperienceItemProps {
  item: ExperienceItemType;
  currentImageIndex: number;
  onImageNavigation: (direction: 'next' | 'prev', imageCount: number) => void;
  onImageClick: (imageList: string[], currentIndex: number) => void;
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
          {currentIsVideo ? (
            <video
              src={mediaPath}
              controls
              onClick={() => onImageClick(images, currentImageIndex)}
            />
          ) : (
            <Image
              src={mediaPath}
              alt={item.title}
              width={300}
              height={220}
              onClick={() => onImageClick(images, currentImageIndex)}
            />
          )}

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
            </>
          )}
        </div>
      )}

      <div className="xp-card__body">
        <h3 className="xp-card__title">{item.title}</h3>
        {item.date && <span className="xp-card__date">{item.date}</span>}
        {item.description && <p className="xp-card__desc">{item.description}</p>}

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

/** Turn bare URLs inside achievement text into clickable links. */
const renderWithLinks = (text: string): React.ReactNode => {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

export default ExperienceItem;
