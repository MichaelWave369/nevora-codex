import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import './reviewer.css';
import './claim-explorer.css';
import './release-dashboard.css';
import './reading-mode.css';
import './reading-mode.js';
import './claim-explorer.js';
import './release-dashboard.js';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
