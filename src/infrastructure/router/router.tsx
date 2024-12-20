import React from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { Dashboard } from '@/pages/dashboard'
import { LoginPage } from '@/features/auth/pages/login'
import { IRouterPort } from 'core/ports/IRouterPort'
import { PageLayout } from '@/components/layouts/PageLayout'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
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
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  }
])

class RouterAdapter implements IRouterPort {
  navigate = async (path: string, replace?: boolean) => {
    await router.navigate(path, { replace: Boolean(replace) })
  }
  reload = () => {
    //todo fix
    window.location.reload()
  }
}

export const Router = new RouterAdapter()
export const useRouter = () => new RouterAdapter()
