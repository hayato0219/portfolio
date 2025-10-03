'use client';

import React, { useState, CSSProperties } from 'react';
import Image from 'next/image';
import type { Translations } from '@/types';
import designDeskImage from '../images/design-desk.jpeg';
import womanWithTabletImage from '../images/woman-with-tablet.jpg';
import currentResearchImage from '../images/currentResearch.png';
import internshipICONImage from '../images/internshipICON.jpg';
import nakamozuAppImage from '../images/nakamozuApp.png';
import pastResearchxImage from '../images/pastResearch.jpeg';

interface ExperienceItem {
  title: string;
  description: string;
  date?: string;
  image?: string;
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
  // 画像のマッピング
  const imageMap: { [key: string]: any } = {
    'design-desk.jpeg': designDeskImage,
    'woman-with-tablet.jpg': womanWithTabletImage,
    'currentResearch.png': currentResearchImage,
    'internshipICON.jpg': internshipICONImage,
    'nakamozuApp.png': nakamozuAppImage,
    'pastResearch.jpeg': pastResearchxImage,
  };

  // 最初の2つの年（2025と2024）を初期状態で開いておく
  const [expandedYears, setExpandedYears] = useState<{ [key: string]: boolean }>({
    '2025': false,
    '2024': false,
  });

  // モーダル用のstate
  const [modalImage, setModalImage] = useState<string | null>(null);

  const toggleYear = (year: string) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  // 画像クリック時にモーダルを開く
  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
  };

  // モーダルを閉じる
  const closeModal = () => {
    setModalImage(null);
  };

  // ★★★ 修正後のスタイル定義 ★★★
  const yearHeaderStyle = {
    // 従来の四角い囲いのスタイルを削除・変更
    // border: '1px solid #ddd',    // 削除
    // borderRadius: '8px',         // 削除
    // backgroundColor: '#f8f9fa',  // 削除し、透明に
    backgroundColor: 'transparent', 

    padding: '16px 20px', // パディングは維持（必要に応じて調整してください）
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    marginBottom: '0.5rem',
    
    // ★★★ 下線を追加 ★★★
    borderBottom: '2px solid #333', // 2pxの太さで濃いグレーの下線
  };

  const yearHeaderHoverStyle = {
    // ホバー時の背景色を削除し、下線の色変更用に定義
    // backgroundColor: '#e9ecef', // 削除
    borderBottomColor: '#44f9ccff', // 例: ホバー時は青色にする
  };
  // ★★★ スタイル定義ここまで ★★★

  const itemStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    padding: '16px',
    backgroundColor: '#fff',
    marginBottom: '0.75rem',
    marginLeft: '1rem',
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  };

  const imageStyle: CSSProperties = {
    width: '150px',
    height: '120px',
    borderRadius: '10%',
    objectFit: 'cover',
    flexShrink: 0,
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  const contentStyle = {
    flex: 1,
  };

  const itemTitleStyle = {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#222',
    marginBottom: '0.5rem',
  };

  const itemTextStyle = {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '0.25rem',
    lineHeight: '1.6',
    whiteSpace: "pre-line",
  };

  const arrowStyle = (isExpanded) => ({
    fontSize: '1.2rem',
    transition: 'transform 0.3s ease',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
  });

  const detailsContainerStyle = (isExpanded) => ({
    maxHeight: isExpanded ? '1000px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease',
  });

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600', color: '#222' }}>{t.experience}</h2>
      <div>
        {services.map((yearData) => {
          const isExpanded = expandedYears[yearData.year];
          return (
            <div key={yearData.year} style={{ marginBottom: '1rem' }}>
              <div 
                style={yearHeaderStyle}
                onClick={() => toggleYear(yearData.year)}
                
                // ★★★ ホバー処理を修正 ★★★
                onMouseEnter={(e) => {
                  // ホバー時に下線の色を変更
                  e.currentTarget.style.borderBottomColor = yearHeaderHoverStyle.borderBottomColor;
                }}
                onMouseLeave={(e) => {
                  // マウスアウトで下線の色を元に戻す
                  e.currentTarget.style.borderBottomColor = '#333';
                }}
                // ★★★ ホバー処理ここまで ★★★
              >
                <span style={{ fontSize: '1.3rem', fontWeight: '700', color: '#333' }}>
                  {yearData.year}
                </span>
                <span style={arrowStyle(isExpanded)}>▼</span>
              </div>
              <div style={detailsContainerStyle(isExpanded)}>
                {yearData.items.map((item, index) => (
                  <div key={index} style={itemStyle}>
                    {item.image && imageMap[item.image] && (
                      <Image 
                        src={imageMap[item.image]} 
                        alt={item.title}
                        width={300}
                        height={200}
                        style={{
                          ...imageStyle,
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          // StaticImageDataからsrc文字列を取得
                          const imgSrc = typeof imageMap[item.image] === 'string' 
                            ? imageMap[item.image] 
                            : imageMap[item.image].src;
                          openModal(imgSrc);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                    )}
                    <div style={contentStyle}>
                      <div style={itemTitleStyle}>{item.title}</div>
                      {item.description && <div style={itemTextStyle}>{item.description}</div>}
                      {item.date && <div style={itemTextStyle}>{item.date}</div>}
                      {item.technologies && <div style={itemTextStyle}>{item.technologies}</div>}
                      {item.tags && <div style={itemTextStyle}>{item.tags}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* モーダル */}
      {modalImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            cursor: 'pointer',
          }}
          onClick={closeModal}
        >
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
            <img 
              src={modalImage} 
              alt="Expanded view"
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
            <button
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#333',
              }}
              onClick={closeModal}
            >
              ×
            </button>
          </div>
        </div>
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
// export default