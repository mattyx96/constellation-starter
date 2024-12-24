import { User } from '@/entities/User.ts';

export class Auth {
  token: string;
  user: User;

  constructor(token: string, user: User) {
    this.token = token;
    this.user = user;
  }
}
