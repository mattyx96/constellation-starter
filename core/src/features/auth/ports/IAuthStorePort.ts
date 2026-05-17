import { Auth } from "@/features/auth";
import { User } from "@/entities/User";

export interface IAuthStorePort {
  getToken(): string;
  getUser(): User | undefined;

  /* actions */
  saveAuth: (auth: Auth) => void;
  setToken: (token: string) => void;
}
