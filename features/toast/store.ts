import create from 'zustand/vanilla'
import { Toast } from './types/Toast';

export type ToastStore = {
  toasters: Toast[]
}
export const toastStore = create<ToastStore>((set) => ({
  toasters: [],
}))
