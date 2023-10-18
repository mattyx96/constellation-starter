import { IAuthStorePort } from '../ports/IAuthStorePort'

export const isLoggedUseCase = (command: {
  authStore: IAuthStorePort
}): boolean => {
  const token = command.authStore.token
  const user = command.authStore.user
  return Boolean(token !== '' && user)
}
