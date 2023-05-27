import {LoginCommand} from "../useCases/loginUseCase";
import {Auth} from "../entities/Auth";

export interface IApiPort {
  login(command: LoginCommand): Promise<Auth>
  logout(): Promise<void>
  signup(command: any): Promise<void>
}
