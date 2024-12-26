import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from '@/infrastructure/toast/toaster';
import { router, Router } from '@/infrastructure/router/router';
import { RouterProvider } from 'react-router-dom';
import { AuthApiService } from '@/features/auth/infrastructure/api/auth-service/authApiService';
import { authStore } from '@/features/auth/infrastructure/store/authStore';
import { ToastService } from '@/infrastructure/toast/toastService';
// @ts-expect-error no .css extension
import 'nebula-ds-react-library/style';
import './index.css';

import { config } from 'core';

config.initCore({
  dependencies: {
    router: {
      resolve: () => new Router(),
    },
    authApiService: {
      resolve: () => new AuthApiService(),
    },
    authStore: {
      resolve: () => authStore.getState(),
    },
    toastService: {
      resolve: () => new ToastService(),
    },
  },
});

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

createRoot(document.getElementById('toast') as HTMLElement).render(
  <StrictMode>
    <Toaster />
  </StrictMode>,
);
