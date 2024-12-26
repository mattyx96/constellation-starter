import { Auth, LoginCommand } from "@/features/auth";

export interface IAuthApiServicePort {
  login(command: LoginCommand): Promise<Auth>;

  logout(): Promise<void>;

  signup(command: unknown): Promise<void>;
}
