import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div style={spinnerStyles}>
    <div style={circleStyles}></div>
  </div>
);

const spinnerStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  zIndex: 9999,
};

const circleStyles: React.CSSProperties = {
  border: '8px solid #f3f3f3',
  borderRadius: '50%',
  borderTop: '8px solid #3498db',
  width: '60px',
  height: '60px',
  animation: 'spin 2s linear infinite',
};

export default LoadingSpinner;
