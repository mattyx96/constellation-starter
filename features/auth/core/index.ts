import {LoginCommand, loginUseCase} from "./useCases/loginUseCase"
import {User} from "./entities/User"
import {Auth} from "./entities/Auth"
import {IApiPort} from "./ports/IApiPort"
import {IDispatcherPort} from "./ports/IDispatcherPort"
import {IRepositoryPort} from "./ports/IRepositoryPort"
import {isLoggedUseCase} from "./useCases/isLoggedUseCase";

export const AuthDomain = {
  loginUseCase,
  isLoggedUseCase
}

//entities
export type {
  User,
  Auth
}

//commands
export type {
  LoginCommand,
}

//adapters
export type {
  IDispatcherPort,
  IApiPort,
  IRepositoryPort,
}
