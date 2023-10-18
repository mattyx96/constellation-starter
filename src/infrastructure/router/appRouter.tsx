import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { ProtectedRoute } from '@/infrastructure/router/ProtectedRoute'
import AppContainer from '@/ui/layouts/AppContainer'

export const appRouter = createBrowserRouter([
  {
    path: '/search',
    element: (
      <ProtectedRoute>
        <AppContainer />
      </ProtectedRoute>
    )
  }
])
