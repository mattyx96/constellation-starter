import { IAuthStorePort } from './ports/IAuthStorePort'
import { IRouterPort, IToastServicePort, Singleton } from '../shared'
import { IAuthApiServicePort } from './ports/IAuthApiServicePort'
import { LoginCommand, loginUseCase } from './useCases/loginUseCase'
import { isLoggedUseCase } from './useCases/isLoggedUseCase'

@Singleton
export class AuthDispatcher {
  authStore: IAuthStorePort
  router: IRouterPort
  authApiService: IAuthApiServicePort
  toastService: IToastServicePort

  constructor(data: {
    authStore: IAuthStorePort
    router: IRouterPort
    authApiService: IAuthApiServicePort
    toastService: IToastServicePort
  }) {
    this.authStore = data.authStore
    this.router = data.router
    this.authApiService = data.authApiService
    this.toastService = data.toastService
  }

  login = async (command: LoginCommand) => {
    await loginUseCase({
      data: command,
      authStore: this.authStore,
      router: this.router,
      authApiService: this.authApiService,
      toastService: this.toastService
    })
  }

  isLogged = async () => {
    return isLoggedUseCase({
      authStore: this.authStore
    })
  }
}
