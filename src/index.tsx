import React from 'react';
import {createRoot} from 'react-dom/client';

import App from './App';

/* eslint-disable-next-line unicorn/prefer-query-selector */
const container = document.getElementById('root');
const root = createRoot(container as Element);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
