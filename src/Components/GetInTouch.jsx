import React from 'react';
import envelopeSvg from '../images/socials/envelope.svg';
import githubSvg from '../images/socials/github.svg';

const GetInTouch = ({ email, gitHub }) => {
  const itemStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '12px 16px',
    backgroundColor: '#fff',
    textAlign: 'left',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: '#333',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    boxSizing: 'border-box',
  };

  const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600', color: '#222' }}>Get in touch</h2>
      <div style={gridStyle}>
        <a href={`mailto:${email}`} style={itemStyle}>
          <img src={envelopeSvg} alt="email" style={{ height: '16px', width: '16px', marginRight: '0.5rem' }} />
          Email
        </a>
        <a href={`https://github.com/${gitHub}`} target="_blank" rel="noopener noreferrer" style={itemStyle}>
          <img src={githubSvg} alt="github" style={{ height: '16px', width: '16px', marginRight: '0.5rem' }} />
          GitHub
        </a>
      </div>
    </div>
  );
};

export default GetInTouch;
