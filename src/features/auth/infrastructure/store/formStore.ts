import { createStore } from 'zustand'
import { LoginCommand } from 'core/features/auth'
import { FormState } from '@/infrastructure/form/FormService'

export const formStore = createStore<FormState<LoginCommand>>((set, get) => {
  return new FormState<LoginCommand>({
    email: 'emilys',
    password: 'emilyspass',
    rememberMe: false
  })
})
