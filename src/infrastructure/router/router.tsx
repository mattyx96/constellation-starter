import React from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { Dashboard } from '@/pages/dashboard'
import { LoginPage } from '@/pages/login'
import { PageLayout } from 'nebula-ds'
import { IRouterPort } from '../../../core/misc'

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
