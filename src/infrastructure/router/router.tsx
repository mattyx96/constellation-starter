import React from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { ProtectedRoute } from '@/infrastructure/router/ProtectedRoute';
import App from '@/App';
import { Dashboard } from '@/pages/dashboard';
import { IRouterPort } from '@features/shared/ports/IRouterPort';
import { PageLayout } from 'ui';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <App />,
  },
  {
    path: '/',
    element: (
      // <ProtectedRoute>
        <PageLayout>
          <Outlet />
        </PageLayout>
      // </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to='/dashboard' replace />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

class RouterAdapter implements IRouterPort {
  navigate = async (path: string, replace?: boolean) => {
    await router.navigate(path, { replace: Boolean(replace) });
  };
  reload = () => {
    //todo fix
    window.location.reload();
  };
}

export const useRouter = () => new RouterAdapter();
