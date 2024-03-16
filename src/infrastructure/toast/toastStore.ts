import { createStore } from 'zustand/vanilla'
import { Toast } from 'core/entities/Toast'

export type ToastStore = {
  toasters: Toast[]
}
export const toastStore = createStore<ToastStore>(() => ({
  toasters: []
}))
