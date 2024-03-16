import { toastStore } from './toastStore'
import { Singleton } from 'core/misc'
import { Toast } from 'core/entities/Toast'
import { IToastServicePort } from 'core/ports/IToastServicePort'

@Singleton
export class ToastService implements IToastServicePort {
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
