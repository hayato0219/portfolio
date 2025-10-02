import React from 'react';

const ServiceIcon = ({ name }) => {
  const style = { marginRight: '0.5rem', width: '16px', height: '16px' };
  const icons = {
    default: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#4F4F4F" />,
  };
  return <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={style}>{icons[name] || icons['default']}</svg>;
};

const Tools = ({ tools, t }) => {
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
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600', color: '#222' }}>{t.tools}</h2>
      {tools.map((tool) => (
        <div key={tool} style={{ ...itemStyle, marginBottom: '0.5rem', gridColumn: '1 / -1' }}>
          <ServiceIcon name="default" />
          {tool}
        </div>
      ))}
    </div>
  );
};

export default Tools;
