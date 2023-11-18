import { IToastServicePort } from '../ports/IToastServicePort'
import { IAuthApiServicePort, IAuthStorePort } from '../features/auth'
import { IRouterPort } from '../ports/IRouterPort'

type Dependency<T> = {
  resolve: () => T
}

export interface IDependencies {
  router: Dependency<IRouterPort>
  toastService: Dependency<IToastServicePort>
  authApiService: Dependency<IAuthApiServicePort>
  authStore: Dependency<IAuthStorePort>
}
