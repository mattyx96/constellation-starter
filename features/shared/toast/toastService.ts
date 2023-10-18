import { toastStore, ToastStore } from './store';
import { Singleton } from '../index';
import { Toast } from './types/Toast';

@Singleton
class ToastService {
  constructor() {
    setInterval(() => {
      // pop
      toastStore.setState((state) => ({
        ...state,
        toasters: state.toasters?.slice(1) ?? [],
      }));
    }, 3000);
  }

  createSuccessToaster(message: string, type?: Toast['type'] ) {
    toastStore.setState((state) => ({
      ...state,
      toasters: [...state.toasters, { type: type || 'INFO', message }],
    }));
  }
}

export const toastService = new ToastService();
