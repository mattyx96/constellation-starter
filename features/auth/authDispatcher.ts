import {Singleton} from "../shared";
import {AuthDomain, IDispatcherPort, LoginCommand} from "./core";


@Singleton
class AuthActionDispatcher implements IDispatcherPort {
  isLogged(): boolean {
    return AuthDomain.isLoggedUseCase();
  }

  async login(command: LoginCommand): Promise<void> {
    return AuthDomain.loginUseCase(command)
  }

}

export const authActionDispatcher = new AuthActionDispatcher()

