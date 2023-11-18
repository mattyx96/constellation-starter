import { DependencyContainer } from '../../../config/DependencyContainer'

const container = new DependencyContainer()

export const isLoggedUseCase = (): boolean => {
  const authStore = container.resolve('authStore')
  const token = authStore.token
  const user = authStore.user
  return Boolean(token !== '' && user)
}
