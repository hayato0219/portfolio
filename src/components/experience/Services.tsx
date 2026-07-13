'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Translations, YearData } from '@/types';
import ExperienceItem from './ExperienceItem';
import ImageModal from './ImageModal';

interface ServicesProps {
  services: YearData[];
  t: Translations;
}

const Services: React.FC<ServicesProps> = ({ services, t }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [modal, setModal] = useState<{
    list: string[];
    index: number;
    caption: string;
  } | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<
    Record<string, number>
  >({});

  useEffect(() => setIsMounted(true), []);

  // Flat, chronology-agnostic list (leads with current work).
  const items = services.flatMap((y) => y.items);

  const openModal = (
    imageList: string[],
    currentIndex: number,
    caption: string
  ) => {
    setModal({ list: imageList, index: currentIndex, caption });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModal(null);
    document.body.style.overflow = '';
  };

  const navigateModal = (direction: 'next' | 'prev') =>
    setModal((prev) => {
      if (!prev) return prev;
      const len = prev.list.length;
      const index =
        direction === 'next'
          ? (prev.index + 1) % len
          : (prev.index - 1 + len) % len;
      return { ...prev, index };
    });

  const goToModalImage = (index: number) =>
    setModal((prev) => (prev ? { ...prev, index } : prev));

  const handleImageNavigation = (
    itemKey: string,
    direction: 'next' | 'prev',
    imageCount: number
  ) =>
    setCurrentImageIndexes((prev) => {
      const current = prev[itemKey] || 0;
      const next =
        direction === 'next'
          ? (current + 1) % imageCount
          : (current - 1 + imageCount) % imageCount;
      return { ...prev, [itemKey]: next };
    });

  return (
    <section id="experience">
      <h2 className="section-title">{t.experience}</h2>

      <div className="xp-list">
        {items.map((item, index) => {
          const itemKey = `xp-${index}`;
          return (
            <ExperienceItem
              key={itemKey}
              item={item}
              currentImageIndex={currentImageIndexes[itemKey] || 0}
              onImageNavigation={(direction, imageCount) =>
                handleImageNavigation(itemKey, direction, imageCount)
              }
              onImageClick={openModal}
              t={t}
            />
          );
        })}
      </div>

      {isMounted &&
        modal &&
        createPortal(
          <ImageModal
            imageList={modal.list}
            currentIndex={modal.index}
            caption={modal.caption}
            onClose={closeModal}
            onNavigate={navigateModal}
            onSelect={goToModalImage}
          />,
          document.body
        )}
    </section>
  );
};

export default Services;
