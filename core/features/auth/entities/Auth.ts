import { User } from '@core/entities/User'

export class Auth {
  token: string
  user: User

  constructor(token: string, user: User) {
    this.token = token
    this.user = user
  }
}
