import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Toaster } from '@/infrastructure/toast/toaster'
import { router, useRouter } from '@/infrastructure/router/router'
import { RouterProvider } from 'react-router-dom'
import { initCore } from 'core/framework'
import { AuthApiService } from '@/infrastructure/api/auth-service/authApiService'
import { authStore } from '@/infrastructure/store/authStore'
import { ToastService } from '@/infrastructure/toast/toastService'
import 'nebula-ds-react-library/style'

initCore({
  dependencies: {
    router: {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      resolve: () => useRouter()
    },
    authApiService: {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      resolve: () => new AuthApiService()
    },
    authStore: {
      resolve: () => authStore.getState()
    },
    toastService: {
      resolve: () => new ToastService()
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('toast') as HTMLElement).render(
  <React.StrictMode>
    <Toaster />
  </React.StrictMode>
)
