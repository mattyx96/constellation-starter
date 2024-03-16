import { create } from 'zustand'
import { LoginCommand } from 'core/features/auth'
import { FormState } from '@/infrastructure/form/FormService'

export const formStore = create<FormState<LoginCommand>>(
  () =>
    new FormState({
      email: '',
      password: '',
      rememberMe: false
    })
)
