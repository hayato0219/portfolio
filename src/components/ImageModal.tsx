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
          width: '80vw',
          maxWidth: '1200px',
          height: '75vh',
          maxHeight: '800px',
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
              background: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#333',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
              zIndex: 10000,
              transition: 'all 0.2s ease',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('prev');
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ‹
          </button>
        )}

        <img
          src={imageSrc}
          alt="Expanded view"
          style={{
            width: '100%',
            height: '100%',
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
              background: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#333',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
              zIndex: 10000,
              transition: 'all 0.2s ease',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('next');
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ›
          </button>
        )}

        {/* 閉じるボタン（Google Driveスタイル） */}
        <button
          style={{
            position: 'absolute',
            top: '-60px',
            right: '0px',
            background: 'rgba(60, 64, 67, 0.95)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
            fontWeight: 'normal',
            zIndex: 10000,
            transition: 'all 0.2s ease',
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(80, 84, 87, 1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(60, 64, 67, 0.95)';
          }}
        >
          ✕
        </button>

        {/* ドットインジケーター（複数画像の場合のみ表示） */}
        {hasMultipleImages && (
          <div
            style={{
              position: 'absolute',
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              padding: '8px 12px',
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '20px',
            }}
          >
            {imageList.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: index === currentIndex ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // クリックで該当の画像に移動する機能を追加する場合
                  const diff = index - currentIndex;
                  if (diff > 0) {
                    for (let i = 0; i < diff; i++) onNavigate('next');
                  } else if (diff < 0) {
                    for (let i = 0; i < Math.abs(diff); i++) onNavigate('prev');
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
