import { createStore } from 'zustand/vanilla'
import { Auth, IAuthStorePort } from '../../../core/features/auth'

export const authStore = createStore<IAuthStorePort>((setState) => ({
  token: '',
  user: undefined,
  loading: false,

  saveAuth: (auth: Auth) => {
    setState({ token: auth.token, user: auth.user })
  },

  setLoading: (loading: boolean) => {
    setState({ loading })
  },

  setToken: (token: string) => {
    setState({ token })
  }
}))
