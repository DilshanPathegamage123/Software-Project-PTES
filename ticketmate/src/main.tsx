
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App.tsx';
// import './index.css';

// const rootElement = document.getElementById('root');
// if (rootElement) {
//   ReactDOM.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//     rootElement
//   );
// }

import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';

// Get the root container element
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}

// Create a root using createRoot
const root = ReactDOM.createRoot(container);

// Render the application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
