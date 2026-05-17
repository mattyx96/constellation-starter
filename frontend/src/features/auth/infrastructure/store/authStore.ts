import { createStore } from 'zustand/vanilla';
import { auth } from 'core';

type AuthStoreState = auth.IAuthStorePort & {
  token: string;
  user?: auth.Auth['user'];
};

export const authStore = createStore<AuthStoreState>((set, get) => ({
  token: '',
  user: undefined,
  getToken: () => get().token,
  getUser: () => get().user,
  saveAuth: (authData: auth.Auth) => {
    set({ token: authData.token, user: authData.user });
  },

  setToken: (token: string) => {
    set({ token });
  },
}));
