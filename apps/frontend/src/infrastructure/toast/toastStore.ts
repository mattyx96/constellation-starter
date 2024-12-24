import { createStore } from 'zustand/vanilla';
import { toastService } from 'core';

export type ToastStore = {
  toasters: toastService.Toast[];
};
export const toastStore = createStore<ToastStore>(() => ({
  toasters: [],
}));
