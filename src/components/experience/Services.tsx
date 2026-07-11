'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Translations, YearData } from '@/types';
import YearSection from './YearSection';
import ImageModal from './ImageModal';

interface ServicesProps {
  services: YearData[];
  t: Translations;
}

const Services: React.FC<ServicesProps> = ({ services, t }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Most recent year expanded by default; older ones collapsed.
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(services.map((y, i) => [y.year, i === 0]))
  );

  const [modal, setModal] = useState<{ list: string[]; index: number } | null>(
    null
  );
  const [currentImageIndexes, setCurrentImageIndexes] = useState<
    Record<string, number>
  >({});

  useEffect(() => setIsMounted(true), []);

  const toggleYear = (year: string) =>
    setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));

  const openModal = (imageList: string[], currentIndex: number) => {
    setModal({ list: imageList, index: currentIndex });
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

      {services.map((yearData) => (
        <YearSection
          key={yearData.year}
          year={yearData.year}
          items={yearData.items}
          isExpanded={!!expandedYears[yearData.year]}
          onToggle={() => toggleYear(yearData.year)}
          currentImageIndexes={currentImageIndexes}
          onImageNavigation={handleImageNavigation}
          onImageClick={openModal}
          t={t}
        />
      ))}

      {isMounted &&
        modal &&
        createPortal(
          <ImageModal
            imageList={modal.list}
            currentIndex={modal.index}
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
