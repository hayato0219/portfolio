import { ImageResponse } from 'next/og';

export const alt = 'Hayato Seki — Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background: 'linear-gradient(135deg, #0b0b0f 0%, #1a1633 60%, #241a4d 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 700,
            }}
          >
            HS
          </div>
          <div style={{ fontSize: '26px', color: '#a5b4fc', fontWeight: 600 }}>
            Portfolio
          </div>
        </div>
        <div style={{ fontSize: '76px', fontWeight: 800, letterSpacing: '-2px' }}>
          Hayato Seki
        </div>
        <div style={{ fontSize: '34px', color: '#c7c7d1', marginTop: '20px' }}>
          Graduate Student · Informatics
        </div>
        <div
          style={{
            display: 'flex',
            gap: '14px',
            marginTop: '46px',
          }}
        >
          {['Next.js', 'TypeScript', 'AI Coding'].map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: '26px',
                fontWeight: 600,
                color: '#c7d2fe',
                padding: '10px 24px',
                borderRadius: '999px',
                border: '1px solid rgba(165,180,252,0.4)',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
