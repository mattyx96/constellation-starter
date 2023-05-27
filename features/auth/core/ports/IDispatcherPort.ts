import {LoginCommand} from "../useCases/loginUseCase";

export interface IDispatcherPort {
  login(command: LoginCommand): Promise<void>
  isLogged(): boolean
}
