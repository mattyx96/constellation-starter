import { LoginCommand, loginUseCase } from './useCases/loginUseCase'
import { isLoggedUseCase } from './useCases/isLoggedUseCase'

// export * from './useCases/logoutUseCase'
// export * from './useCases/signupUseCase'

/* entities */
export * from './entities/Auth'

export const useCases = {
  loginUseCase,
  isLoggedUseCase
}

/* ports */
export * from './ports/IAuthApiServicePort'
export * from './ports/IAuthStorePort'

/* types*/
export type { LoginCommand }
