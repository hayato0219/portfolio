import React from 'react';

const Tools = ({ tools }) => {
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
  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600', color: '#222' }}>Tools</h2>
      <div style={{ ...gridStyle }}>
        {tools.map((tool) => (
          <div key={tool} style={itemStyle}>
            {tool}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tools;
