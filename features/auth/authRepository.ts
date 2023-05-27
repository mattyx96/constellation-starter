import {Singleton} from "../shared";
import {Auth, IRepositoryPort, User} from "./core";
import {authStore} from "./authStore";

@Singleton
class AuthRepository implements IRepositoryPort {
  saveAuth(auth: Auth): void {
    return authStore.setState({token: auth.token, user: auth.user})
  }

  getUser(): User | undefined {
    return authStore.getState().user;
  }

  getToken(): string {
    return authStore.getState().token;
  }

  setLoading(loading: boolean): void {
    return authStore.setState({loading});
  }

  setToken(token: string): void {
    return authStore.setState({token})
  }
}

export const authRepository = new AuthRepository()
