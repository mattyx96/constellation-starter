import { toastStore } from '../store/store'
import { Singleton } from 'core/shared'
import { Toast } from 'core/shared/entities/Toast'
import { IToastServicePort } from 'core/shared/ports/IToastServicePort'

@Singleton
class ToastServiceAdapter implements IToastServicePort {
  constructor() {
    setInterval(() => {
      // pop
      toastStore.setState((state) => ({
        ...state,
        toasters: state.toasters?.slice(1) ?? []
      }))
    }, 3000)
  }

  createSuccessToaster(message: string, type?: Toast['type']) {
    toastStore.setState((state) => ({
      ...state,
      toasters: [...state.toasters, { type: type || 'INFO', message }]
    }))
  }
}

export const toastService = new ToastServiceAdapter()
