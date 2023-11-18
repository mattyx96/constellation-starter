import { createStore } from 'zustand/vanilla'
import { Toast } from '../../../core/misc'

export type ToastStore = {
  toasters: Toast[]
}
export const toastStore = createStore<ToastStore>(() => ({
  toasters: []
}))
