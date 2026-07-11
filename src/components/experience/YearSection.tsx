'use client';

import React from 'react';
import ExperienceItem from './ExperienceItem';
import type { Translations, ExperienceItem as ExperienceItemType } from '@/types';

interface YearSectionProps {
  year: string;
  items: ExperienceItemType[];
  isExpanded: boolean;
  onToggle: () => void;
  currentImageIndexes: Record<string, number>;
  onImageNavigation: (
    itemKey: string,
    direction: 'next' | 'prev',
    imageCount: number
  ) => void;
  onImageClick: (imageList: string[], currentIndex: number) => void;
  t: Translations;
}

const YearSection: React.FC<YearSectionProps> = ({
  year,
  items,
  isExpanded,
  onToggle,
  currentImageIndexes,
  onImageNavigation,
  onImageClick,
  t,
}) => {
  return (
    <div className="year">
      <button
        type="button"
        className="year__header"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <span className="year__label">{year}</span>
        <span className="year__chevron" aria-hidden="true">
          ▼
        </span>
      </button>

      <div className={`year__body${isExpanded ? ' year__body--open' : ''}`}>
        <div className="year__body-inner">
          {items.map((item, index) => {
            const itemKey = `${year}-${index}`;
            return (
              <ExperienceItem
                key={itemKey}
                item={item}
                currentImageIndex={currentImageIndexes[itemKey] || 0}
                onImageNavigation={(direction, imageCount) =>
                  onImageNavigation(itemKey, direction, imageCount)
                }
                onImageClick={onImageClick}
                t={t}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YearSection;
