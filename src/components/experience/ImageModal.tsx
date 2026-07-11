'use client';

import React, { useEffect } from 'react';

interface ImageModalProps {
  imageList: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
  onSelect: (index: number) => void;
}

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov'];
const isVideo = (filename: string) =>
  VIDEO_EXTENSIONS.some((ext) => filename.toLowerCase().endsWith(ext));

const ImageModal: React.FC<ImageModalProps> = ({
  imageList,
  currentIndex,
  onClose,
  onNavigate,
  onSelect,
}) => {
  const hasMultipleImages = imageList.length > 1;
  const currentName = imageList[currentIndex] ?? '';
  const imageSrc = `/images/${currentName}`;
  const currentIsVideo = isVideo(currentName);

  // Keyboard controls: Esc to close, arrows to navigate.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (hasMultipleImages && e.key === 'ArrowRight') onNavigate('next');
      else if (hasMultipleImages && e.key === 'ArrowLeft') onNavigate('prev');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hasMultipleImages, onClose, onNavigate]);

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
      onClick={onClose}
    >
      <div className="modal__stage" onClick={(e) => e.stopPropagation()}>
        {hasMultipleImages && (
          <button
            type="button"
            className="modal__btn modal__btn--prev"
            aria-label="Previous"
            onClick={() => onNavigate('prev')}
          >
            ‹
          </button>
        )}

        {currentIsVideo ? (
          <video className="modal__media" src={imageSrc} controls autoPlay />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="modal__media" src={imageSrc} alt="Expanded view" />
        )}

        {hasMultipleImages && (
          <button
            type="button"
            className="modal__btn modal__btn--next"
            aria-label="Next"
            onClick={() => onNavigate('next')}
          >
            ›
          </button>
        )}

        <button
          type="button"
          className="modal__btn modal__btn--close"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>

        {hasMultipleImages && (
          <div className="modal__dots">
            {imageList.map((_, index) => (
              <button
                type="button"
                key={index}
                className={`modal__dot${
                  index === currentIndex ? ' modal__dot--active' : ''
                }`}
                aria-label={`Go to image ${index + 1}`}
                onClick={() => onSelect(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
