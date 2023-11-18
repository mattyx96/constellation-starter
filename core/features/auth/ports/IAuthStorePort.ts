import { Auth } from '../entities/Auth'
import { User } from '../../../entities/User'

export interface IAuthStorePort {
  token: string
  user?: User
  loading: boolean

  /* actions */
  saveAuth: (auth: Auth) => void
  setLoading: (loading: boolean) => void
  setToken: (token: string) => void
}
