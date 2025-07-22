import React from 'react';

const ServiceIcon = ({ name }) => {
  const style = { marginRight: '0.5rem', width: '16px', height: '16px' };
  const icons = {
    "Website Designing": <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-4zm-4 14H8v-2h8v2zm-8-4H8v-2h4v2zm0-4H8V8h4v2zm6 4h-4v-2h4v2zm0-4h-4V8h4v2zm4 4h-2v-2h2v2zm0-4h-2V8h2v2z" fill="#4F4F4F" />,
    "Copywriting": <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.11 4.65 1 5c0 0 .09.01.24.03.21.03.44.07.69.13.25.06.5.13.75.2.75.25 1.5.5 2.25.5.75 0 1.5-.25 2.25-.5.25-.07.5-.14.75-.2.25-.06.48-.1.69-.13C11.91 5.01 12 5 12 5s.09.01.24.03c.21.03.44.07.69.13.25.06.5.13.75.2.75.25 1.5.5 2.25.5.75 0 1.5-.25 2.25-.5.25-.07.5-.14.75-.2.25-.06.48-.1.69-.13.15-.02.24-.03.24-.03zM1 9c.24-.02.48-.05.73-.09.25-.04.5-.08.75-.13.75-.15 1.5-.25 2.25-.25s1.5.1 2.25.25c.25.05.5.09.75.13.25.04.49.07.73.09.15.01.24.01.24.01s.09,0,.24-.01c.24-.02.48-.05.73-.09.25-.04.5-.08.75-.13.75-.15 1.5-.25 2.25-.25s1.5.1 2.25.25c.25.05.5.09.75.13.25.04.49.07.73.09.15.01.24.01.24.01v10c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.11 19.65 1 20V9z" fill="#4F4F4F" />,
  };
  return <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={style}>{icons[name] || <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#4F4F4F" />}</svg>;
};

const Services = ({ services }) => {
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
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600', color: '#222' }}>My Services</h2>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#444', fontWeight: '500' }}>Checkout services offered by me</h3>
      <div style={{ ...gridStyle, gridTemplateColumns: '1fr 1fr' }}>
        {services.map((service) => (
          <div key={service} style={itemStyle}>
            <ServiceIcon name={service} />
            {service}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
