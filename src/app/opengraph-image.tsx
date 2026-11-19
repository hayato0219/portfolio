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
          justifyContent: 'space-between',
          padding: '88px',
          background: '#fafaf9',
          color: '#151514',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: '26px', color: '#6e6b66', letterSpacing: '1px' }}>
          Portfolio
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '96px', fontWeight: 700, letterSpacing: '-3px' }}>
            Hayato Seki
          </div>
          <div style={{ fontSize: '34px', color: '#52504c', marginTop: '16px' }}>
            Graduate student in Informatics, building web apps.
          </div>
        </div>
        <div style={{ display: 'flex', height: '2px', width: '120px', background: '#151514' }} />
      </div>
    ),
    { ...size }
  );
}
