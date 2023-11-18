import { Toast } from '../entities/Toast'

export interface IToastServicePort {
  createSuccessToaster: (message: string, type?: Toast['type']) => void
}
