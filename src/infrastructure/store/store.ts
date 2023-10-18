import { createStore } from 'zustand/vanilla'
import { Toast } from 'core/shared'

export type ToastStore = {
  toasters: Toast[]
}
export const toastStore = createStore<ToastStore>(() => ({
  toasters: []
}))
