import { User } from '../../../entities/User'

export interface Auth {
  token: string
  user?: User
}
