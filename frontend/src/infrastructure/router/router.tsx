import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { Dashboard } from '@/pages/dashboard';
import { LoginPage } from '@/features/auth/pages/login';
import { PageLayout } from '@/components/layouts/PageLayout';
import { routerService } from 'core';
import { Singleton } from 'core';

// eslint-disable-next-line react-refresh/only-export-components
export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
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
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

@Singleton
class RouterAdapter implements routerService.IRouterPort {
  navigate = async (path: string, replace?: boolean) => {
    await router.navigate(path, { replace: Boolean(replace) });
  };
  reload = () => {
    //todo fix
    window.location.reload();
  };
}

export const Router = RouterAdapter;
