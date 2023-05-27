import {authRepository} from "../../authRepository";

export const isLoggedUseCase = (): boolean => {
  const token = authRepository.getToken()
  const user = authRepository.getUser()
  return Boolean(token !== "" && user)
}
