import { toastStore } from './toastStore';
import { Singleton, toastService } from 'core';

@Singleton
export class ToastService implements toastService.IToastServicePort {
  constructor() {
    setInterval(() => {
      // pop
      toastStore.setState((state) => ({
        ...state,
        toasters: state.toasters?.slice(1) ?? [],
      }));
    }, 10000);
  }

  createSuccessToaster(message: string, type?: toastService.Toast['type']) {
    toastStore.setState((state) => ({
      ...state,
      toasters: [...state.toasters, { type: type || 'INFO', message }],
    }));
  }
}
