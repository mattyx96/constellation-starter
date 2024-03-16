import { Singleton } from '../../misc'
import { LoginCommand, loginUseCase } from './useCases/loginUseCase'
import { isLoggedUseCase } from './useCases/isLoggedUseCase'

@Singleton
export class AuthDispatcher {
  login = async (command: LoginCommand) => {
    await loginUseCase({ data: command })
  }

  isLogged = async () => {
    return isLoggedUseCase()
  }
}
