import { User } from '../../shared'

export interface Auth {
  token: string
  user?: User
}
