import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToasterService } from './components/toasterService';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

ReactDOM.createRoot(document.getElementById('toast') as HTMLElement).render(
  <React.StrictMode>
    <ToasterService />
  </React.StrictMode>,
);
