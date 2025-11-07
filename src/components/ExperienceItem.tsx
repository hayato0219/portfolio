'use client';

import React, { CSSProperties } from 'react';
import Image from 'next/image';

interface ExperienceItemProps {
  item: {
    title: string;
    description: string;
    date?: string;
    images?: string[];
    technologies?: string;
    tags?: string;
  };
  itemKey: string;
  currentImageIndex: number;
  onImageNavigation: (direction: 'next' | 'prev', imageCount: number) => void;
  onImageClick: (imagePath: string, imageList: string[], currentIndex: number) => void;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  item,
  itemKey,
  currentImageIndex,
  onImageNavigation,
  onImageClick,
}) => {
  const hasMultipleImages = item.images && item.images.length > 1;
  const imagePath = item.images ? `/images/${item.images[currentImageIndex]}` : '';

  const itemStyle = {
    border: '1px solid #e8e8e8',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: '#fff',
    marginBottom: '1rem',
    marginLeft: '1rem',
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s ease',
  };

  const imageContainerStyle: CSSProperties = {
    position: 'relative',
    width: '180px',
    height: '140px',
    flexShrink: 0,
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const imageStyle: CSSProperties = {
    borderRadius: '8px',
    objectFit: 'cover',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const arrowButton: CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(68, 249, 204, 0.9)',
    color: '#000',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
  };

  const contentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
  };

  const itemTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.25rem',
    lineHeight: '1.4',
  };

  const itemDateStyle = {
    fontSize: '0.85rem',
    color: '#666',
    fontWeight: '500',
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: '#f0f0f0',
    borderRadius: '12px',
    marginBottom: '0.5rem',
  };

  const itemDescriptionStyle = {
    fontSize: '0.95rem',
    color: '#333',
    lineHeight: '1.7',
    marginBottom: '0.5rem',
  };

  const itemTechnologiesStyle = {
    fontSize: '0.875rem',
    color: '#555',
    lineHeight: '1.6',
    padding: '8px 12px',
    backgroundColor: '#f8f9ff',
    borderRadius: '6px',
    borderLeft: '3px solid #6366f1',
  };

  const itemTagsStyle = {
    fontSize: '0.875rem',
    color: '#0a7d4a',
    lineHeight: '1.6',
    padding: '8px 12px',
    backgroundColor: '#e6fff5',
    borderRadius: '6px',
    borderLeft: '3px solid #44f9ccff',
    fontWeight: '500',
    whiteSpace: 'pre-line' as const,
  };

  return (
    <div
      style={itemStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
      }}
    >
      {item.images && item.images.length > 0 && (
        <div style={imageContainerStyle}>
          {hasMultipleImages && (
            <button
              style={{ ...arrowButton, left: '-10px' }}
              onClick={() => onImageNavigation('prev', item.images!.length)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(68, 249, 204, 1)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(68, 249, 204, 0.9)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              &#x2190;
            </button>
          )}
          <Image
            src={imagePath}
            alt={item.title}
            width={300}
            height={200}
            style={{
              ...imageStyle,
              width: '100%',
              height: '100%',
            }}
            onClick={() => onImageClick(imagePath, item.images || [], currentImageIndex)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          {hasMultipleImages && (
            <button
              style={{ ...arrowButton, right: '-10px' }}
              onClick={() => onImageNavigation('next', item.images!.length)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(68, 249, 204, 1)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(68, 249, 204, 0.9)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              &#x2192;
            </button>
          )}
        </div>
      )}
      <div style={contentStyle}>
        <div style={itemTitleStyle}>{item.title}</div>
        {item.date && <div style={itemDateStyle}>{item.date}</div>}
        {item.description && <div style={itemDescriptionStyle}>{item.description}</div>}
        {item.technologies && <div style={itemTechnologiesStyle}>{item.technologies}</div>}
        {item.tags && <div style={itemTagsStyle}>{item.tags}</div>}
      </div>
    </div>
  );
};

export default ExperienceItem;
