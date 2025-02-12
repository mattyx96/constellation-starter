import { createStore } from 'zustand';
import { FormState } from '@/infrastructure/form/FormService';
import { auth } from 'core';

export const formStore = createStore<FormState<auth.LoginCommand>>((set, get) => {
  return new FormState<auth.LoginCommand>({
    email: 'emilys',
    password: 'emilyspass',
    rememberMe: false,
  });
});
