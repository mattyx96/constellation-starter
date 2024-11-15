import React from 'react'
import { Navigate } from 'react-router-dom'
import { authStore } from '@/infrastructure/store/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!authStore.getState().token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
