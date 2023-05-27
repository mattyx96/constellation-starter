import {User} from "../entities/User";

export interface IStorePort {
  token: string,
  user?: User,
  loading: boolean
}
