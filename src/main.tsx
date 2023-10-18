import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ToasterService } from './infrastructure/toast/toasterService';
import { router } from '@/infrastructure/router/router';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

ReactDOM.createRoot(document.getElementById('toast') as HTMLElement).render(
  <React.StrictMode>
    <ToasterService />
  </React.StrictMode>,
);
