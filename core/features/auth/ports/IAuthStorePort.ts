import { Auth } from '../entities/Auth'
import { User } from '../../../entities/User'

export interface IAuthStorePort {
  token: string
  user?: User

  /* actions */
  saveAuth: (auth: Auth) => void
  setToken: (token: string) => void
}
