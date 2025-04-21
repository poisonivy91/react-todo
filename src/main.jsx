import React from 'react'; // ✅ REQUIRED for JSX
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
