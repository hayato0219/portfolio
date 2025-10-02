import React from 'react';

const AboutMe = ({ about, t }) => {
  const pStyle = { color: '#555', lineHeight: '1.7', fontSize: '1rem' };

  return (
    <div id="about" style={{ scrollMarginTop: '80px' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600', color: '#222' }}>{t.aboutMe}</h2>
      <p style={pStyle}>{about}</p>
    </div>
  );
};

export default AboutMe;
