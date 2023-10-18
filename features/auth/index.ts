import { Auth, AuthDomain, LoginCommand, User } from './core';
import { authStore } from './authStore';

export { authStore };

export type {
  User, Auth, LoginCommand,
};
export const authActionDispatcher = {
  isLogged(): boolean {
    return AuthDomain.isLoggedUseCase();
  },

  async login(command: LoginCommand): Promise<void> {
    return AuthDomain.loginUseCase(command);
  },
};
