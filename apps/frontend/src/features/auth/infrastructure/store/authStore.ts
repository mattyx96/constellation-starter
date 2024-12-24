import { createStore } from 'zustand/vanilla';
import { auth } from 'core';

export const authStore = createStore<auth.IAuthStorePort>((setState) => ({
  token: '',
  user: undefined,
  saveAuth: (auth: auth.Auth) => {
    setState({ token: auth.token, user: auth.user });
  },

  setToken: (token: string) => {
    setState({ token });
  },
}));
