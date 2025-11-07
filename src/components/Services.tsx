'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Translations } from '@/types';
import YearSection from './YearSection';
import ImageModal from './ImageModal';

interface ExperienceItem {
  title: string;
  description: string;
  date?: string;
  images?: string[];
  technologies?: string;
  tags?: string;
}

interface YearData {
  year: string;
  items: ExperienceItem[];
}

interface ServicesProps {
  services: YearData[];
  t: Translations;
}

const Services: React.FC<ServicesProps> = ({ services, t }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [expandedYears, setExpandedYears] = useState<{ [key: string]: boolean }>({
    '2025': false,
    '2024': true,
  });
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalImageList, setModalImageList] = useState<string[]>([]);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleYear = (year: string) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  const openModal = (imageSrc: string, imageList: string[], currentIndex: number) => {
    setModalImage(imageSrc);
    setModalImageList(imageList);
    setModalImageIndex(currentIndex);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalImage(null);
    setModalImageList([]);
    setModalImageIndex(0);
    document.body.style.overflow = 'auto';
  };

  const handleModalImageNavigation = (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next'
      ? (modalImageIndex + 1) % modalImageList.length
      : (modalImageIndex - 1 + modalImageList.length) % modalImageList.length;
    setModalImageIndex(newIndex);
    setModalImage(`/images/${modalImageList[newIndex]}`);
  };

  const handleImageNavigation = (itemKey: string, direction: 'next' | 'prev', imageCount: number) => {
    setCurrentImageIndexes(prev => {
      const currentIndex = prev[itemKey] || 0;
      const nextIndex = direction === 'next' ? (currentIndex + 1) % imageCount : (currentIndex - 1 + imageCount) % imageCount;
      return { ...prev, [itemKey]: nextIndex };
    });
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600', color: '#222' }}>
        {t.experience}
      </h2>
      <div>
        {services.map((yearData) => (
          <YearSection
            key={yearData.year}
            year={yearData.year}
            items={yearData.items}
            isExpanded={expandedYears[yearData.year]}
            onToggle={() => toggleYear(yearData.year)}
            currentImageIndexes={currentImageIndexes}
            onImageNavigation={handleImageNavigation}
            onImageClick={openModal}
            t={t}
          />
        ))}
      </div>

      {isMounted && modalImage && createPortal(
        <ImageModal
          imageSrc={modalImage}
          imageList={modalImageList}
          currentIndex={modalImageIndex}
          onClose={closeModal}
          onNavigate={handleModalImageNavigation}
        />,
        document.body
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          h2 {
            font-size: 1.3rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;
