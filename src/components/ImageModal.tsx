'use client';

import React from 'react';

interface ImageModalProps {
  imageSrc: string;
  imageList: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  imageSrc,
  imageList,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const hasMultipleImages = imageList.length > 1;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 左矢印ボタン（複数画像の場合のみ表示） */}
        {hasMultipleImages && (
          <button
            style={{
              position: 'absolute',
              left: '-60px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              fontSize: '2rem',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#333',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.5)',
              zIndex: 10000,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('prev');
            }}
          >
            &#x2190;
          </button>
        )}

        <img
          src={imageSrc}
          alt="Expanded view"
          style={{
            maxWidth: '100%',
            maxHeight: '90vh',
            objectFit: 'contain',
            borderRadius: '8px',
          }}
        />

        {/* 右矢印ボタン（複数画像の場合のみ表示） */}
        {hasMultipleImages && (
          <button
            style={{
              position: 'absolute',
              right: '-60px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              fontSize: '2rem',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#333',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.5)',
              zIndex: 10000,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('next');
            }}
          >
            &#x2192;
          </button>
        )}

        {/* 閉じるボタン */}
        <button
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            fontSize: '2rem',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#333',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.5)',
            fontWeight: 'bold',
            zIndex: 10000,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          ×
        </button>

        {/* 画像カウンター（複数画像の場合のみ表示） */}
        {hasMultipleImages && (
          <div
            style={{
              position: 'absolute',
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#333',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            {currentIndex + 1} / {imageList.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
