import React from 'react';
import githubSvg from '../images/socials/github.svg';
import instagramSvg from '../images/socials/instagram.svg';
import facebookSvg from '../images/socials/microsoft.svg';

const AboutMe = ({ about, socials }) => {
  const pStyle = { color: '#555', lineHeight: '1.7', fontSize: '1rem' };
  const socialGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.5rem' };
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

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600', color: '#222' }}>About Me</h2>
      <p style={pStyle}>{about}</p>
      <div style={socialGridStyle}>
        <a href={socials.website} target="_blank" rel="noopener noreferrer" style={itemStyle}>
          <img src={githubSvg} alt="website" style={{ height: '16px', width: '16px', marginRight: '0.5rem' }} />
          Website
        </a>
        <a href={`https://www.instagram.com/${socials.instagram}`} target="_blank" rel="noopener noreferrer" style={itemStyle}>
          <img src={instagramSvg} alt="instagram" style={{ height: '16px', width: '16px', marginRight: '0.5rem' }} />
          Instagram
        </a>
        <a href={`https://www.facebook.com/${socials.facebook}`} target="_blank" rel="noopener noreferrer" style={itemStyle}>
          <img src={facebookSvg} alt="facebook" style={{ height: '16px', width: '16px', marginRight: '0.5rem' }} />
          Facebook
        </a>
      </div>
    </div>
  );
};

export default AboutMe;
