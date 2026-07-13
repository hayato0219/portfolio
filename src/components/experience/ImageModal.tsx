'use client';

import React, { useEffect, useRef } from 'react';

interface ImageModalProps {
  imageList: string[];
  currentIndex: number;
  caption?: string;
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
  caption,
  onClose,
  onNavigate,
  onSelect,
}) => {
  const hasMultipleImages = imageList.length > 1;
  const currentName = imageList[currentIndex] ?? '';
  const imageSrc = `/images/${currentName}`;
  const currentIsVideo = isVideo(currentName);
  const stageRef = useRef<HTMLDivElement>(null);

  // Keyboard controls + focus management (trap + restore).
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    stageRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (hasMultipleImages && e.key === 'ArrowRight') {
        onNavigate('next');
      } else if (hasMultipleImages && e.key === 'ArrowLeft') {
        onNavigate('prev');
      } else if (e.key === 'Tab') {
        // Trap focus within the modal.
        const focusables = stageRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], video'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [hasMultipleImages, onClose, onNavigate]);

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label={caption || 'Media viewer'}
      onClick={onClose}
    >
      <div
        className="modal__stage"
        ref={stageRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
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
          <img className="modal__media" src={imageSrc} alt={caption || 'Expanded view'} />
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

        {(caption || hasMultipleImages) && (
          <div className="modal__meta">
            {caption && <span className="modal__caption">{caption}</span>}
            {hasMultipleImages && (
              <span className="modal__counter">
                {currentIndex + 1} / {imageList.length}
              </span>
            )}
          </div>
        )}

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
