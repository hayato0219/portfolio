'use client';

import React from 'react';
import ExperienceItem from './ExperienceItem';

interface ExperienceItemType {
  title: string;
  description: string;
  date?: string;
  images?: string[];
  technologies?: string;
  tags?: string;
}

interface YearSectionProps {
  year: string;
  items: ExperienceItemType[];
  isExpanded: boolean;
  onToggle: () => void;
  currentImageIndexes: { [key: string]: number };
  onImageNavigation: (itemKey: string, direction: 'next' | 'prev', imageCount: number) => void;
  onImageClick: (imagePath: string, imageList: string[], currentIndex: number) => void;
}

const YearSection: React.FC<YearSectionProps> = ({
  year,
  items,
  isExpanded,
  onToggle,
  currentImageIndexes,
  onImageNavigation,
  onImageClick,
}) => {
  const yearHeaderStyle = {
    backgroundColor: 'transparent',
    padding: '18px 24px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    marginBottom: '0.5rem',
    borderBottom: '2px solid #333',
  };

  const yearHeaderHoverStyle = {
    borderBottomColor: '#44f9ccff',
  };

  const arrowStyle = {
    fontSize: '1.2rem',
    transition: 'transform 0.3s ease',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
  };

  const detailsContainerStyle = {
    maxHeight: isExpanded ? '10000px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.5s ease',
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div
        style={yearHeaderStyle}
        onClick={onToggle}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderBottomColor = yearHeaderHoverStyle.borderBottomColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderBottomColor = '#333';
        }}
      >
        <span style={{ fontSize: '1.4rem', fontWeight: '700', color: '#1a1a1a' }}>
          {year}
        </span>
        <span style={arrowStyle}>▼</span>
      </div>
      <div style={detailsContainerStyle}>
        {items.map((item, index) => {
          const itemKey = `${year}-${index}`;
          const itemImageIndex = currentImageIndexes[itemKey] || 0;

          return (
            <ExperienceItem
              key={index}
              item={item}
              itemKey={itemKey}
              currentImageIndex={itemImageIndex}
              onImageNavigation={(direction, imageCount) =>
                onImageNavigation(itemKey, direction, imageCount)
              }
              onImageClick={onImageClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default YearSection;
