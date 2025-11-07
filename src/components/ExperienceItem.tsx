'use client';

import React, { CSSProperties } from 'react';
import Image from 'next/image';
import type { Translations } from '@/types';

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
  t: Translations;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  item,
  itemKey,
  currentImageIndex,
  onImageNavigation,
  onImageClick,
  t,
}) => {
  const hasMultipleImages = item.images && item.images.length > 1;
  const mediaPath = item.images ? `/images/${item.images[currentImageIndex]}` : '';

  // ファイル拡張子で動画かどうかを判定
  const isVideo = (filename: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const currentIsVideo = item.images ? isVideo(item.images[currentImageIndex]) : false;

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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#333',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    fontWeight: 'normal',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
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
    color: '#444',
    lineHeight: '1.8',
    marginBottom: '0.5rem',
  };

  const itemTechnologiesStyle = {
    fontSize: '0.875rem',
    color: '#374151',
    lineHeight: '1.7',
    padding: '12px 16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  };

  const itemTagsStyle = {
    fontSize: '0.875rem',
    color: '#065f46',
    lineHeight: '1.7',
    padding: '12px 16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #d1fae5',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    fontWeight: '500',
    whiteSpace: 'pre-line' as const,
  };

  const technologiesLabelStyle = {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#6366f1',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  const tagsLabelStyle = {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#10b981',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
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
          <div style={{
            borderRadius: '8px',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
          }}>
            {currentIsVideo ? (
              <video
                src={mediaPath}
                style={{
                  ...imageStyle,
                  width: '100%',
                  height: '100%',
                }}
                controls
                onClick={() => onImageClick(mediaPath, item.images || [], currentImageIndex)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            ) : (
              <Image
                src={mediaPath}
                alt={item.title}
                width={300}
                height={200}
                style={{
                  ...imageStyle,
                  width: '100%',
                  height: '100%',
                }}
                onClick={() => onImageClick(mediaPath, item.images || [], currentImageIndex)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            )}
          </div>
          {hasMultipleImages && (
            <button
              style={{ ...arrowButton, left: '-15px' }}
              onClick={() => onImageNavigation('prev', item.images!.length)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
              }}
            >
              ‹
            </button>
          )}
          {hasMultipleImages && (
            <button
              style={{ ...arrowButton, right: '-15px' }}
              onClick={() => onImageNavigation('next', item.images!.length)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
              }}
            >
              ›
            </button>
          )}
        </div>
      )}
      <div style={contentStyle}>
        <div style={itemTitleStyle}>{item.title}</div>
        {item.date && <div style={itemDateStyle}>{item.date}</div>}
        {item.description && <div style={itemDescriptionStyle}>{item.description}</div>}

        {item.technologies && (
          <div>
            <div style={technologiesLabelStyle}>
              <span>{t.technologiesLabel}</span>
            </div>
            <div style={itemTechnologiesStyle}>
              {item.technologies.split(',').map((tech, index) => (
                <span key={index} style={{
                  display: 'inline-block',
                  margin: '4px 6px 4px 0',
                  padding: '4px 10px',
                  backgroundColor: '#f0f4ff',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  color: '#4f46e5',
                  fontWeight: '500',
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {item.tags && (
          <div>
            <div style={tagsLabelStyle}>
              <span>{t.achievementsLabel}</span>
            </div>
            <div style={itemTagsStyle}>
              {item.tags.split('\n').filter(tag => tag.trim()).map((tag, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: index < item.tags!.split('\n').filter(t => t.trim()).length - 1 ? '8px' : '0',
                  paddingLeft: '4px',
                }}>
                  <span style={{
                    color: '#10b981',
                    marginRight: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    lineHeight: '1.7',
                  }}>・</span>
                  <span style={{ flex: 1, lineHeight: '1.7' }}>
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceItem;
