import {Auth} from "../entities/Auth";
import {User} from "../entities/User";

export interface IRepositoryPort {
  saveAuth: (auth: Auth) => void
  setLoading: (loading: boolean) => void
  getUser: () => User | undefined
  getToken: () => string
  setToken: (token: string) => void
}
