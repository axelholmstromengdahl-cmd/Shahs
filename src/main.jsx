import React from 'react';
import { createRoot } from 'react-dom/client';
// Base styles first so component CSS (imported via App) can override them.
import './styles/base.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
